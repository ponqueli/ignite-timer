import { createContext, useCallback, useMemo, useState } from "react";

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICyclesContextType {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  markNullToActiveCycleId: () => void;
  setSecondsPassed: (seconds: number) => void;
  interruptCurrentCycle: () => void;
  createNewCycle: (data: ICreateCycleData) => void;
}

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICyclesContextProviderProps {
  children: React.ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContextType);

export function CyclesContextProvider({
  children,
}: ICyclesContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const markNullToActiveCycleId = useCallback(() => {
    setActiveCycleId(null);
  }, []);

  const markCurrentCycleAsFinished = useCallback(() => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          };
        }
        return cycle;
      })
    );
  }, [activeCycleId]);

  const setSecondsPassed = useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds);
  }, []);

  const createNewCycle = useCallback((data: ICreateCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
  }, []);

  const interruptCurrentCycle = useCallback(() => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          };
        }
        return cycle;
      })
    );
    markNullToActiveCycleId();
  }, [activeCycleId, markNullToActiveCycleId]);

  const CycleProviderValuesMemoized = useMemo(
    () => ({
      cycles,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      markNullToActiveCycleId,
      setSecondsPassed,
      interruptCurrentCycle,
      createNewCycle,
    }),
    [
      cycles,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      markNullToActiveCycleId,
      setSecondsPassed,
      interruptCurrentCycle,
      createNewCycle,
    ]
  );

  return (
    <CyclesContext.Provider value={CycleProviderValuesMemoized}>
      {children}
    </CyclesContext.Provider>
  );
}
