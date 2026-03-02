import { useCallback, useRef } from "react";

/**
 * Hook that provides a text scramble/decode animation effect.
 * Characters cycle through random symbols before settling on the final text.
 */
export function useTextScramble() {
  const intervalRef = useRef<any>(null);

  const scramble = useCallback(
    (
      element: HTMLElement,
      finalText: string,
      options?: { duration?: number; chars?: string },
    ) => {
      const { duration = 1500, chars = "!<>-_\\/[]{}—=+*^?#_01" } =
        options || {};
      const length = finalText.length;
      const steps = Math.ceil(duration / 30);
      let step = 0;

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        let output = "";
        const progress = step / steps;

        for (let i = 0; i < length; i++) {
          if (i < length * progress) {
            output += finalText[i];
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        element.textContent = output;
        step++;

        if (step > steps) {
          element.textContent = finalText;
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 30);
    },
    [],
  );

  return { scramble };
}
