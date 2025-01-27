import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapProps } from "./map";

const Map = ({ center, checkpoints, userLocation }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const zoom = 14;
  maptilersdk.config.apiKey = process.env
    .NEXT_PUBLIC_MAPTILER_API_KEY as string;

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [center[1], center[0]],
        zoom: zoom,
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
        new maptilersdk.Marker({ element: locationElement })
          .setLngLat([userLocation.coords[1], userLocation.coords[0]]) // Adjusted to match [lng, lat]
          .addTo(map.current!);

        checkpoints.forEach((checkpoint) => {
          new maptilersdk.Marker({ color: "#ff4747" })
            .setLngLat([checkpoint.coords[1], checkpoint.coords[0]]) // Adjusted to match [lng, lat]
            .addTo(map.current!);
        });
      }
    }
  }, [center, checkpoints, userLocation, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
