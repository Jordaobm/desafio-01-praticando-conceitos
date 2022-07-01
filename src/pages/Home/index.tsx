import { Header } from "../../components/Header";
import { NewTask } from "../../components/NewTask";
import { TaskList } from "../../components/TaskList";
import { useLocalStorage } from "../../utils/localStorage";
import styles from "./home.module.css";

export interface ITask {
  id: string;
  text: string;
  finished?: boolean;
}

export function Home() {
  const [tasks, setTasks] = useLocalStorage("@tasks", []);

  function orderTasks(tasksArray: ITask[]) {
    return tasksArray?.sort((a: ITask, b: ITask) => (a?.finished ? 1 : -1));
  }

  function handleCreateNewTask(newTask: ITask) {
    const newTasksArr = [...tasks, newTask];
    setTasks(orderTasks(newTasksArr));
  }

  function toggleFinishedTask(toggleTask: ITask) {
    const newTasksArr = tasks?.map((task) =>
      task?.id === toggleTask?.id
        ? { ...toggleTask, finished: !toggleTask?.finished }
        : task
    );

    setTasks(orderTasks(newTasksArr));
  }

  function deleteTask(deleteTask: ITask) {
    const newTasksArr = tasks?.filter((task) => task?.id !== deleteTask?.id);
    setTasks(orderTasks(newTasksArr));
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.containerNewTask}>
        <NewTask onCreate={handleCreateNewTask} />
        <TaskList
          tasks={tasks}
          onToggle={toggleFinishedTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}
