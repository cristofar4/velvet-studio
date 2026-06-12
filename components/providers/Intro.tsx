"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type IntroState = {
  /** True once the preloader has fully exited — hero choreography keys off this. */
  done: boolean;
  finish: () => void;
};

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const value = useMemo(() => ({ done, finish: () => setDone(true) }), [done]);
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}
