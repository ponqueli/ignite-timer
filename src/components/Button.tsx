import { ButtonContainer, ButtonVariant } from "./Button.styes";

interface IButtonProps {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary" }: IButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
}
