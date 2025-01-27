import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapProps } from "./map";
import { Checkpoint } from "@/app/[eventCode]/page";
import CheckpointData from "./checkpoint-data";
import { AnimatePresence } from "motion/react";

const Map = ({ center, checkpoints, userLocation }: MapProps) => {
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

      const marker = {
        type: "Feature",
        properties: {
          message: "Foo",
          iconSize: [60, 60],
        },
        geometry: {
          type: "Point",
          coordinates: [-66.324462890625, -16.024695711685304],
        },
      };

      var locationElement = document.createElement("div");
      locationElement.className =
        "bg-blue-500 size-6 border-2 ring-8 ring-blue-300/20 border-white rounded-full";

      // locationElement.addEventListener("click", function () {
      //   window.alert(marker.properties.message);
      // });

      if (map.current) {
        // new maptilersdk.Marker({ element: locationElement })
        //   .setLngLat([userLocation.coords[1], userLocation.coords[0]]) // Adjusted to match [lng, lat]
        //   .addTo(map.current!);

        checkpoints.forEach((checkpoint) => {
          const marker = new maptilersdk.Marker({ color: "#ff4747" })
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
