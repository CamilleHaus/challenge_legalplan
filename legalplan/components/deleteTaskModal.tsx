import { ITasks } from "@/data/tasksList";
import styles from "../styles/closeModal.module.scss";

interface IDeleteTaskModal {
  onClose: () => void;
  onConfirm: (tarefa: ITasks) => void;
  item: ITasks | null;
}

const DeleteTaskModal: React.FC<IDeleteTaskModal> = ({
  onClose,
  onConfirm,
  item,
}) => {
  if (!item) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3 className={styles.modal__title}>Confirmar Exclusão</h3>
        <p className={styles.modal__question}>
          Você tem certeza você deseja deletar essa tarefa?
        </p>
        <div className={styles.modal__actions}>
          <button onClick={onClose} className={styles.modal__cancel}>
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(item)}
            className={styles.modal__delete}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
