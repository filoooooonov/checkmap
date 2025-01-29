import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapProps } from "./map";
import { Checkpoint } from "@/app/[eventCode]/page";
import CheckpointData from "./checkpoint-data";
import { AnimatePresence } from "motion/react";

const Map = ({ center, checkpoints, userLocation, primaryColor }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const zoom = 10;
  maptilersdk.config.apiKey = process.env
    .NEXT_PUBLIC_MAPTILER_API_KEY as string;

  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<Checkpoint | null>(null);

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [center[1], center[0]],
        zoom: zoom,
        navigationControl: "top-left",
        geolocateControl: "top-left",
      });

      map.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        console.log(`Longitude: ${lng}, Latitude: ${lat}`);
      });

      if (map.current) {
        checkpoints.forEach((checkpoint) => {
          const marker = new maptilersdk.Marker({ color: "#000000" })
            .setLngLat([checkpoint.coords[1], checkpoint.coords[0]]) // Adjusted to match [lng, lat]
            .addTo(map.current!);

          const markerElement = marker.getElement();
          if (markerElement) {
            markerElement.classList.add("cursor-pointer");
          }

          marker.getElement().addEventListener("click", () => {
            setSelectedCheckpoint(checkpoint);
          });
        });
      }
    }
  }, [center, checkpoints, userLocation, zoom]);

  useEffect(() => {
    if (map.current) {
    }
  }, [map]);

  return (
    <div className="relative map-wrap">
      <div ref={mapContainer} className="map" />
      <AnimatePresence>
        {selectedCheckpoint && (
          <div>
            <CheckpointData
              checkpoint={selectedCheckpoint}
              onClose={() => setSelectedCheckpoint(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Map;
