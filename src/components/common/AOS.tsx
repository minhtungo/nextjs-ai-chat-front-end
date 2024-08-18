"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import "@/styles/custom-aos.css";

export default function AOSWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        once: true,
        disable: "phone",
        duration: 600,
        easing: "ease-out-sine",
      });
    }, 50);
  }, []);

  return <>{children}</>;
}
