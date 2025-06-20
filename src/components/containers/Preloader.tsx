import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  children: React.ReactNode;
  imageSources: string[];
}

const Preloader: React.FC<PreloaderProps> = ({ children, imageSources }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let count = 0;
    const total = imageSources.length;

    if (total === 0) {
      setLoaded(true);
      return;
    }

    const onLoad = () => {
      count++;
      if (count === total) {
        // espera un pelín antes de iniciar la salida
        setTimeout(() => setLoaded(true), 300);
      }
    };

    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) onLoad();
      else {
        img.onload = onLoad;
        img.onerror = onLoad;
      }
    });
  }, [imageSources]);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="preloader"
            className="fixed inset-0 flex items-center justify-center bg-midnight-950 text-white z-50"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.p
              className="text-6xl md:text-8xl font-ArialBold text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal que va apareciendo a medida que el preloader se va */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.6 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default Preloader;
