import bpmData, { GenreData } from "./bpmData";

export const detectGenre = (bpm: number): string => {
  const genre = bpmData.find(
    (data: GenreData) => bpm >= data.bpmRange[0] && bpm <= data.bpmRange[1]
  );
  return genre ? genre.genre : "Unknown";
};
