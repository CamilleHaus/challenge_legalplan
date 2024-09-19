"use client";

import { Trash } from "lucide-react";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import { tasksList, ITasks } from "@/data/tasksList";
import DeleteTaskModal from "@/components/deleteTaskModal";
import AddTaskModal from "@/components/addTaskModal";

export default function Home() {
  const [tasks, setTasks] = useState<ITasks[]>(tasksList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITasks | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const incompletedTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  const toggletask = (index: number) => {
    const newTask = [...tasks];
    newTask[index].isCompleted = !newTask[index].isCompleted;
    setTasks(newTask);
  };

  const deleteTask = (task: ITasks) => {
    const newTask = tasks.filter((t) => t !== task);
    setTasks(newTask);
    closeDeleteTaskModal();
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTask("");
  };

  const addNewTask = () => {
    if (newTask.trim() !== "") {
      const newListOfTasks = [...tasks, { task: newTask, isCompleted: false }];
      setTasks(newListOfTasks);
      closeModal();
    }
  };

  const openDeleteModal = (task: ITasks) => {
    setTaskToDelete(task);
    setDeleteTaskModal(true);
  };

  const closeDeleteTaskModal = () => {
    setDeleteTaskModal(false);
  };

  return (
    <div className={styles.tasks}>
      <div className={styles.tasks__container}>
        <h3 className={styles.tasks__titulo}>Suas tarefas de hoje</h3>

        <ul className={styles.tasks__lista}>
          {incompletedTasks.map((task, index) => (
            <li key={index} className={styles.tasks__item}>
              <div className={styles.tasks__input}>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  className={styles.tasks__checkbox}
                  onChange={() => toggletask(tasks.indexOf(task))}
                />
                <p className={styles.tasks__descricao}>{task.task}</p>
              </div>
              <Trash
                strokeWidth={1}
                className={styles.tasks__icon}
                size={24}
                onClick={() => openDeleteModal(task)}
              />
            </li>
          ))}
        </ul>

        <h4>Tarefas finalizadas</h4>
        <ul className={styles.tasks__lista}>
          {completedTasks.map((task, index) => (
            <li key={index} className={styles.tasks__item}>
              <div className={styles.tasks__input}>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  className={styles.tasks__checkbox}
                  onChange={() => toggletask(tasks.indexOf(task))}
                />
                <p className={styles.tasks__descricao}>{task.task}</p>
              </div>
              <Trash
                strokeWidth={1}
                className={styles.tasks__icon}
                size={24}
                onClick={() => openDeleteModal(task)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.button__container}>
        <button className={styles.button} onClick={openModal}>
          Adicionar nova tarefa
        </button>
      </div>

      {isModalOpen && (
        <AddTaskModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          addNewTask={addNewTask}
          newTask={newTask}
          setNewTask={setNewTask}
        />
      )}

      {deleteTaskModal && (
        <DeleteTaskModal
          onClose={closeDeleteTaskModal}
          onConfirm={deleteTask}
          item={taskToDelete}
        />
      )}
    </div>
  );
}
