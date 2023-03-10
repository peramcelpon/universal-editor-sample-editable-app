import React, { useEffect, useRef, createContext, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import createAnimationTimeline from "./TimelineHelperFunctions";
import {useRouter} from "next/router";
ScrollTrigger.defaults({ toggleActions: "play reverse play reverse" });
gsap.defaults({ ease: "power1.inOut" });
gsap.registerPlugin(ScrollTrigger);

export const TimelineProvider = createContext(null);

export const TimelineAnimationWrapper = ({ children }) => {
  const router = useRouter();
  const params = router.query;

  const [debugAnim, setDebugAnim] = useState(null);
  const [isEditable, setIsEditable] = useState(params?.authorHost && params?.isEditable === 'true');
  const ref = useRef();
  const q = gsap.utils.selector(ref);
  const createTimeline = (timelineArray, timelineSettings, runOnEnd) => {
    createAnimationTimeline(gsap, q, timelineArray, timelineSettings, runOnEnd, debugAnim, isEditable);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const debugAnimQuery = urlParams.get("debugAnim");
    if (debugAnimQuery === "instant") setDebugAnim("instant");
    // Refresh ScrollTrigger when page switches, fixes snap positions staying through pages
    window.onload = () => ScrollTrigger.refresh();
  }, []);

  return (
    <div className="gsapAnimationsWrapper" ref={ref}>
      <TimelineProvider.Provider value={createTimeline}>{children}</TimelineProvider.Provider>
    </div>
  );
};
