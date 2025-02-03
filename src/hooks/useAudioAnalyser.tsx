import { useState, useEffect } from "react";

const useAudioAnalyzer = () => {
  const [bpm, setBPM] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [amplitude, setAmplitude] = useState(0);

  useEffect(() => {
    const startAudioAnalysis = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const analyzeAudio = () => {
        analyser.getByteFrequencyData(dataArray);

        // Calcular frecuencia promedio
        const avgFrequency =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        // Estimar BPM basado en la frecuencia
        const estimatedBPM = avgFrequency * 2; // Ajuste para convertir frecuencias en BPM

        setFrequency(avgFrequency);
        setBPM(estimatedBPM);
        setAmplitude(Math.max(...dataArray));

        requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
    };

    startAudioAnalysis();
  }, []);

  return { bpm, frequency, amplitude };
};

export default useAudioAnalyzer;
