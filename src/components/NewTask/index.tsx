import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import { ITask } from "../../pages/Home";
import styles from "./newTask.module.css";
import { v4 as uuidv4 } from "uuid";

interface NewTaskProps {
  onCreate: (newTask: ITask) => void;
}

export function NewTask({ onCreate }: NewTaskProps) {
  const [newTaskText, setNewTaskText] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit() {
    if (!!newTaskText) {
      onCreate({
        finished: false,
        id: String(uuidv4()),
        text: newTaskText
      });
      setNewTaskText("");
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.container}>
      <input
        onFocus={() => {
          setError(false);
        }}
        className={`${error && styles.inputError}`}
        value={newTaskText}
        onChange={(e) => {
          setError(false);
          setNewTaskText(e?.target?.value);
        }}
        type="text"
        name="task"
        id="task"
        placeholder="Adicione uma nova tarefa"
      />

      <button onClick={handleSubmit}>
        Criar <PlusCircle size={22} />
      </button>
    </div>
  );
}
