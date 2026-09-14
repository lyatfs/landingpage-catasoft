"use client";

import * as React from "react";
import SamsungHelloVietnameseEffect from "@/components/ui/text-effect";

const settings = {
  speed: 1,
  rotateY: -15,
  scale: 0.7,
  opacity: 0,
};

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const [runId, setRunId] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setRunId((n) => n + 1), 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SamsungHelloVietnameseEffect
        key={runId}
        speed={s.speed}
        rotateY={s.rotateY}
        scale={s.scale}
        opacity={s.opacity}
        className="h-40 text-foreground"
      />
    </div>
  );
}
