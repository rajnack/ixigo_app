"use client";

import React from "react";
import FlightDetails from "@/components/FlightDetails";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((resolved) => {
      setId(resolved.id);
    });
  }, [params]);

  if (!id) return <div>Loading...</div>;

  return (
    <div>
      <FlightDetails id={id} />
    </div>
  );
}
