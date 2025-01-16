"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const MapLoader = ({ posix }: { posix: any }) => {
  return <Map posix={posix} />;
};

export default MapLoader;
