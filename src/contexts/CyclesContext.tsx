import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { cyclesReducer, ICycle } from "../reducers/cycles";

interface ICyclesContextType {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
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

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const markCurrentCycleAsFinished = useCallback(() => {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
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

    dispatch({
      type: "ADD_CYCLE",
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);
  }, []);

  const interruptCurrentCycle = useCallback(() => {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  }, [activeCycleId]);

  const CycleProviderValuesMemoized = useMemo(
    () => ({
      cycles,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
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
