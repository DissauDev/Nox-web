import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  children: React.ReactNode;
  imageSources: string[];
}

const Preloader: React.FC<PreloaderProps> = ({ children, imageSources }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedImagesCount = 0;
    const totalImages = imageSources.length;

    if (totalImages === 0) {
      setLoaded(true);
      return;
    }

    const imageLoaded = () => {
      loadedImagesCount++;
      if (loadedImagesCount === totalImages) {
        setTimeout(() => setLoaded(true), 500); // Pequeña pausa antes de ocultar el preloader
      }
    };

    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        imageLoaded();
      } else {
        img.onload = imageLoaded;
        img.onerror = imageLoaded;
      }
    });
  }, [imageSources]);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-midnight-blue-950 text-white z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="text-4xl font-ArialBold tracking-wide"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {loaded && children}
    </>
  );
};

export default Preloader;
