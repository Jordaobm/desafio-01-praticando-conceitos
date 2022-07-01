import { useMemo } from "react";
import taskIcon from "../../assets/task.svg";
import { ITask } from "../../pages/Home";
import { Task } from "../Task";
import styles from "./taskList.module.css";

interface TaskListProps {
  tasks: ITask[];
  onToggle: (task: ITask) => void;
  onDelete: (task: ITask) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const totalAndFinished = useMemo(
    () =>
      tasks?.reduce(
        (previousValue: any, currentValue: any) => {
          if (currentValue?.finished) {
            return {
              all: previousValue?.all + 1,
              finished: previousValue?.finished + 1
            };
          }
          return {
            all: previousValue?.all + 1,
            finished: previousValue?.finished
          };
        },
        { all: 0, finished: 0 }
      ),
    [tasks]
  );

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.marker}>
          <p className={styles.created}>Tarefas criadas</p>
          <span>{totalAndFinished?.all}</span>
        </div>

        <div className={styles.marker}>
          <p className={styles.finished}>Concluídas</p>
          <span>
            {totalAndFinished?.finished} de {totalAndFinished?.all}
          </span>
        </div>
      </header>

      {/* tasks */}

      <div className={styles.taskList}>
        {!tasks?.length && (
          <div className={styles.notTasks}>
            <img src={taskIcon} alt="Task" />
            <div>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}

        {tasks?.map((task) => (
          <Task
            key={task?.id}
            info={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
