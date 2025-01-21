import { Header } from "@/components/header";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ eventCode: string }>;
}) {
  const eventCode = (await params).eventCode;

  return (
    <div>
      <Header />
    </div>
  );
}
