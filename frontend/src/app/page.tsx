"use client";

import { useScroll } from "framer-motion";
import React, { useState, useEffect } from "react";
import { GoogleGeminiEffectDemo } from "./components/GoogleGeminiEffectDemo";
import IntroduceSection from "./components/LandingPage/Introduce";
import OurTeamSection from "./components/LandingPage/OurTeam";

export default function Home() {
  const { scrollY } = useScroll();
  const [showIntroduce, setShowIntroduce] = useState(false);
  const [showTeam, setShowTeam] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      console.log("Scroll position:", latest);
      if (latest > 200 && !showIntroduce) {
        setShowIntroduce(true);
      }
      if (latest > 400 && !showTeam) {
        setShowTeam(true);
      }
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <main>
      <GoogleGeminiEffectDemo />
      {showIntroduce && <IntroduceSection/>}
      {showTeam && <OurTeamSection />}
      <div className="h-[100px] bg-black"></div>
    </main>
  );
}
