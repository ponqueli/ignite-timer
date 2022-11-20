import { differenceInSeconds } from "date-fns";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { cyclesReducer, ICycle } from "../reducers/cycles/reducer";

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

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, () => {

    const storedStatesAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');
    if (storedStatesAsJSON) {
      return JSON.parse(storedStatesAsJSON);
    }
  });

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate)
      );
    }
    return 0;
  });

  const markCurrentCycleAsFinished = useCallback(() => {
    dispatch(markCurrentCycleAsFinishedAction(activeCycleId));
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

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }, []);

  const interruptCurrentCycle = useCallback(() => {
    dispatch(interruptCurrentCycleAction(activeCycleId));
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

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider value={CycleProviderValuesMemoized}>
      {children}
    </CyclesContext.Provider>
  );
}
