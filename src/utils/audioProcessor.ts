import * as Tone from "tone";

export interface AudioAnalysis {
  analyser: Tone.Analyser;
  context: Tone.Context;  // Asegúrate de que 'Tone.Context' es el tipo correcto
}

export const analyzeAudio = async (): Promise<AudioAnalysis> => {
  // Solicita permisos para acceder al micrófono
  const mic = new Tone.UserMedia();
  await mic.open(); // Abre el flujo del micrófono

  if (mic.state === "started") {
    console.log("Micrófono activo");
  }

  const analyser = new Tone.Analyser("fft", 256);
  mic.connect(analyser); // Conecta el micrófono al analizador

  // Asegúrate de que `Tone.getContext()` devuelve el tipo adecuado
  const context = Tone.getContext() as Tone.Context;

  return { analyser, context };
};

export const detectBPM = (analyser: Tone.Analyser): number => {
  const data = analyser.getValue();

  if (!(data instanceof Float32Array)) {
    throw new Error("El analizador no devuelve un Float32Array válido");
  }

  // Calcular la energía total de la señal en diferentes frecuencias
  const totalEnergy = data.reduce((acc, val) => acc + Math.abs(val), 0);
  
  // Estimar el BPM basándonos en la energía. Este es un algoritmo muy básico,
  // debes sustituirlo por un algoritmo más sofisticado de detección de BPM
  const bpm = Math.max(60, Math.round(totalEnergy * 0.1)); // Ajusta el valor de '0.1' según sea necesario.

  console.log("BPM estimado:", bpm);

  return bpm;

};
