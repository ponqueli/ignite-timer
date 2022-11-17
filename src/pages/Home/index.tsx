import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, memo, useMemo, useState, useCallback } from "react";
import { HandPalm, Play } from "phosphor-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a  tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O tempo mínimo é de 5 minutos")
    .max(60, "O tempo máximo é de 60 minutos"),
});

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICyclesContextType {
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  markNullToActiveCycleId: () => void;
  setSecondsPassed: (seconds: number) => void;
}
// controlled / uncontrolled
// register returna onChange, onBlur, onFocus, value, name, ref
// como ela retorna várias métodos, usa o spreadoperator pra pegar todos os métodos
// pega todas as informações do register e acopla no input como propriedades

export const CyclesContext = createContext({} as ICyclesContextType);
export const CyclesProvider = memo(CyclesContext.Provider);

export function Home() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const newCycleForm = useForm<INewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5,
    },
  });

  const { handleSubmit, reset, watch } = newCycleForm;

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

  function handleCreateNewCicle(data: INewCycleFormData) {
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

    reset();
  }

  const handleInterruptCycle = () => {
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
    toast.warning("Tarefa interrompida!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const task = watch("task");
  const isSubmitDisabled = !task;

  /**
   *  Prop Drilling -> muitas propriedades passadas apenas para comunicação para componentes filhos
   *  pode ser muito trabalhoso e dificultar bastante a manutenção
   *  SOLUÇÃO: CONTEXT API => permite compartilharmos informações entre VÁRIOS COMPONENTES
   *  ao mesmo tempo
   *
   *  Context API -> permite compartilhar informações entre componentes sem precisar passar por
   * vários componentes intermediários (prop drilling)
   */

  const CycleProviderValuesMemoized = useMemo(
    () => ({
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      markNullToActiveCycleId,
      setSecondsPassed,
    }),
    [
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      markNullToActiveCycleId,
      setSecondsPassed,
    ]
  );

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
        <CyclesContext.Provider value={CycleProviderValuesMemoized}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </HomeContainer>
  );
}
