import { Trash, Check } from "phosphor-react";
import { useState } from "react";
import styles from "./task.module.css";
import check from "../../assets/check.svg";
import { ITask } from "../../pages/Home";

interface TaskProps {
  info: ITask;
  onToggle: (task: ITask) => void;
  onDelete: (task: ITask) => void;
}

export function Task({ info, onToggle, onDelete }: TaskProps) {
  return (
    <div className={styles.container}>
      <div className={styles.infoTask}>
        <div className={styles.buttons}>
          {info?.finished ? (
            <button className={styles.check} onClick={() => onToggle(info)}>
              <img src={check} alt="Finalizado" />
            </button>
          ) : (
            <button
              className={styles.notCheck}
              onClick={() => onToggle(info)}
            ></button>
          )}
        </div>

        <p className={info?.finished ? styles.textDashed : styles.textNormal}>
          {info?.text}
        </p>
      </div>
      <button className={styles.deleteTask} onClick={() => onDelete(info)}>
        <Trash size={20} />
      </button>
    </div>
  );
}
