import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const center = { lng: 24.9384, lat: 60.1699 };
  const zoom = 14;
  maptilersdk.config.apiKey = "MiY3IELT9Mq2Lo4qUgnd";

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [center.lng, center.lat],
        zoom: zoom,
      });
    }

    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([24.9, 60.2])
      .addTo(map.current);
  }, [center.lng, center.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
