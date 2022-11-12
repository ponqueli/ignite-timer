import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  MinutesAmountInput,
  TaskInput,
} from "./styles";

// controlled / uncontrolled
// register returna onChange, onBlur, onFocus, value, name, ref
// como ela retorna várias métodos, usa o spreadoperator pra pegar todos os métodos
// pega todas as informações do register e acopla no input como propriedades
export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function handleCreateNewCicle(data: any) {
    console.log(data);
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="taskSuggestions"
            {...register("task", { pattern: /^[^ ][\w\W ]*[^ ]/ })}
          />
          <datalist id="taskSuggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto Banana" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
