"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";


export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.1]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.13, 1.1]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.1]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.1]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.1]);

  return (
    <div
      className="h-[400vh] bg-black w-full relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
