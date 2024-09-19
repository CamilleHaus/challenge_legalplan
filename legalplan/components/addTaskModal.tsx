import React from "react";
import styles from "../styles/modal.module.scss";

interface IAddModalTasks {
  isModalOpen: boolean;
  closeModal: () => void;
  addNewTask: (task: string) => void;
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
}

const addTaskModal: React.FC<IAddModalTasks> = ({
  isModalOpen,
  closeModal,
  addNewTask,
  newTask,
  setNewTask,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modal__task}>Nova Tarefa</h2>
        <div className={styles.modal__box}>
          <p>Título</p>
          <input
            type="text"
            placeholder="Digite"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={styles.modal__input}
          />
        </div>
        <div className={styles.modal__actions}>
          <button onClick={closeModal} className={styles.modal__cancel}>
            Cancelar
          </button>
          <button
            onClick={() => addNewTask(newTask)}
            className={styles.modal__add}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default addTaskModal;
