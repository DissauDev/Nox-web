// src/context/PageDataContext.tsx
import { Page } from "@/store/features/api/pageApi";
import { createContext, useContext } from "react";


interface PageDataContextValue {
  bannerPageData?: Page;
}

export const PageDataContext = createContext<PageDataContextValue>({});

export const usePageData = () => useContext(PageDataContext);
