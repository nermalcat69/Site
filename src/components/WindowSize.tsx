"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion"

const WindowSize = () => {
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.div>
        <p className="z-20 md:bg-[#fff] md:p-1 lg:bg-none md:visible bottom-8 left-8 fixed hidden sm:block font-mono text-xs text-neutral-400">
          {width} X {height} • Deployed on Zerops
        </p>
      </motion.div>
    </>
  );
};

export default WindowSize;

