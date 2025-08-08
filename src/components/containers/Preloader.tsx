import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetPageBySlugQuery } from "@/store/features/api/pageApi";
import { PageDataContext } from "./PageDataContext";

interface PreloaderProps {
  children: React.ReactNode;
  imageSources: string[];
}

const Preloader: React.FC<PreloaderProps> = ({ children, imageSources }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const { data: bannerPageData, isSuccess } = useGetPageBySlugQuery("banner");

  // Preload imágenes
  useEffect(() => {
    let count = 0;
    const total = imageSources.length;

    if (total === 0) {
      setImagesLoaded(true);
      return;
    }

    const onLoad = () => {
      count++;
      if (count === total) {
        setImagesLoaded(true);
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

  // Esperar a que tanto imágenes como datos estén listos
  useEffect(() => {
    if (imagesLoaded && isSuccess) {
      setTimeout(() => setReady(true), 300);
    }
  }, [imagesLoaded, isSuccess]);

  return (
    <PageDataContext.Provider value={{ bannerPageData }}>
      <AnimatePresence>
        {!ready && (
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
      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.6 }}
        >
          {children}
        </motion.div>
      )}
    </PageDataContext.Provider>
  );
};

export default Preloader;
