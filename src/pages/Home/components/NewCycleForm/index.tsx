import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a  tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O tempo mínimo é de 5 minutos")
    .max(60, "O tempo máximo é de 60 minutos"),
});

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<INewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5,
    },
  });

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="taskSuggestions"
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
