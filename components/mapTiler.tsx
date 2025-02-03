import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Checkpoint } from "@/app/[eventCode]/page";
import CheckpointData from "./checkpoint-data";
import { AnimatePresence } from "motion/react";
import { LatLngTuple } from "leaflet";
import { IEvent } from "@/models/event";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

export interface MapProps {
  center: LatLngTuple;
  checkpoints: Checkpoint[];
  zoom?: number;
  primaryColor: string;
  eventData: IEvent;
}

const Map = ({ center, checkpoints, primaryColor, eventData }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const zoom = 10;
  maptilersdk.config.apiKey = process.env
    .NEXT_PUBLIC_MAPTILER_API_KEY as string;

  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<Checkpoint | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [center[1], center[0]],
        zoom: zoom,
        navigationControl: "bottom-left",
        geolocateControl: "bottom-left",
      });

      const navigationControlContainer = document.querySelector(
        ".maptiler-ctrl-top-left"
      );
      if (navigationControlContainer) {
        navigationControlContainer.classList.add("map-navigation-control");
      }

      map.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        console.log(`Longitude: ${lng}, Latitude: ${lat}`);
      });

      if (map.current) {
        checkpoints.forEach((checkpoint: Checkpoint) => {
          const marker = new maptilersdk.Marker({
            color: checkpoint.isInside ? "#FFFFFF" : "#000000",
          })
            .setLngLat([
              checkpoint.location.coordinates[1],
              checkpoint.location.coordinates[0],
            ]) // Adjusted to match [lng, lat]
            .addTo(map.current!);

          const markerElement = marker.getElement();
          if (markerElement) {
            markerElement.classList.add("cursor-pointer");
          }

          marker.getElement().addEventListener("click", () => {
            setSelectedCheckpoint(checkpoint);
            if (!isDesktop) {
              setDrawerOpen(!drawerOpen);
            }
          });
        });
      }
    }
  }, [center, checkpoints, zoom]);

  useEffect(() => {
    if (map.current) {
    }
  }, [map]);

  return (
    <div className="relative map-wrap">
      <div ref={mapContainer} className="map" />
      {/* TODO: show the checkpoint data in a Drawer */}
      {/* {selectedCheckpoint && (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <CheckpointData
              checkpoint={selectedCheckpoint}
              onClose={() => setSelectedCheckpoint(null)}
              eventData={eventData}
            />
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )} */}

      <AnimatePresence>
        {selectedCheckpoint && (
          <div className="bg-background">
            <CheckpointData
              checkpoint={selectedCheckpoint}
              onClose={() => setSelectedCheckpoint(null)}
              eventData={eventData}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Map;
