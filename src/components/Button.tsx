import styles from "./Button.module.css";

interface IButtonProps {
  color?: "primary" | "secondary" | "danger" | "success";
}

export function Button({ color = "primary" }: IButtonProps) {
  return (
    <button type="button" className={`${styles.button} ${styles[color]}`}>
      Enviar
    </button>
  );
}
