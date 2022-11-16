import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { differenceInSeconds } from "date-fns";
import { CountdownContainer, Separator } from "./styles";
import { CyclesContext } from "../..";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    markNullToActiveCycleId,
  } = useContext(CyclesContext);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceInSecondsValue = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (differenceInSecondsValue >= totalSeconds) {
          markCurrentCycleAsFinished();

          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
          markNullToActiveCycleId();
          toast.success("Tarefa finalizada com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setAmountSecondsPassed(differenceInSecondsValue);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    markNullToActiveCycleId,
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `🔥 ${minutes}:${seconds} 🔥`;
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
