import { createContext, memo, useEffect, useMemo, useState } from "react";
import { HandPalm, Play } from "phosphor-react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

// controlled / uncontrolled
// register returna onChange, onBlur, onFocus, value, name, ref
// como ela retorna várias métodos, usa o spreadoperator pra pegar todos os métodos
// pega todas as informações do register e acopla no input como propriedades

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
  markCurrentCycleAsFinished: () => void;
  markNullToActiveCycleId: () => void;
}

export const CyclesContext = createContext({} as ICyclesContextType);
export const CyclesProvider = memo(CyclesContext.Provider);

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markNullToActiveCycleId() {
    setActiveCycleId(null);
  }

  function markCurrentCycleAsFinished() {
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
  }

  // function handleCreateNewCicle(data: INewCycleFormData) {
  //   const id = String(new Date().getTime());

  //   const newCycle: ICycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   };

  //   setCycles((state) => [...state, newCycle]);
  //   setActiveCycleId(id);
  //   // setAmountSecondsPassed(0);

  //   reset();
  // }

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
    setActiveCycleId(null);
  };

  // const task = watch("task");
  // const isSubmitDisabled = !task;

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
      markCurrentCycleAsFinished,
      markNullToActiveCycleId,
    }),
    [
      activeCycle,
      activeCycleId,
      markCurrentCycleAsFinished,
      markNullToActiveCycleId,
    ]
  );

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCicle)} */ action="">
        <CyclesContext.Provider value={CycleProviderValuesMemoized}>
          <NewCycleForm />
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
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
