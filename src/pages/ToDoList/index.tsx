import React, { useState, FormEvent, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToDo } from "../../store/ducks/todos/types";
import { User } from "../../store/ducks/auth/types";
import { addToDoRequest, toggleToDo } from "../../store/ducks/todos/actions";
import { ApplicationState } from "../../store";
import MainLayout from "../../layouts/MainLayout";

import "./styles.css";

interface ToAddToDoState {
  title: string;
  description: string;
}

interface StateProps {
  todos: ToDo[];
  user: User | null;
}

type HTMLInput = HTMLInputElement & HTMLTextAreaElement;

const ToDoList: React.FC = () => {
  const dispatch = useDispatch();

  const { todos, user } = useSelector<ApplicationState, StateProps>(
    (state) => ({
      todos: state.todos.data,
      user: state.auth.user,
    })
  );

  const [newTodo, setNewTodo] = useState<ToAddToDoState>({
    title: "",
    description: "",
  });

  function handleAddNewTodo(event: FormEvent) {
    event.preventDefault();

    const toAddToDo = {
      title: newTodo.title,
      description: newTodo.description,
      checked: false,
      user: user?.id || "",
    };

    dispatch(addToDoRequest(toAddToDo));
    setNewTodo({
      title: "",
      description: "",
    });
  }

  function handleChange(event: ChangeEvent<HTMLInput>) {
    const { name, value } = event.currentTarget;
    setNewTodo({ ...newTodo, [name]: value });
  }

  function handleToggleToDo(id: string) {
    dispatch(toggleToDo(id));
  }

  return (
    <MainLayout>
      <div id="todos-page">
        <form onSubmit={handleAddNewTodo}>
          <fieldset className="form-fieldset">
            <label className="form-label" htmlFor="title">
              Título
            </label>
            <input
              className="form-input"
              name="title"
              id="title"
              type="text"
              placeholder="Digite seu novo ToDo"
              value={newTodo.title}
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="form-fieldset">
            <label className="form-label" htmlFor="description">
              Descrição
            </label>
            <textarea
              className="form-textarea"
              name="description"
              id="description"
              placeholder="Digite a descrição do seu novo ToDo"
              value={newTodo.description}
              onChange={handleChange}
              required
            />
          </fieldset>
          <button className="form-button" type="submit">
            Adicionar
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <header>
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => handleToggleToDo(todo.id)}
                />
                <strong>{todo.title}</strong>
              </header>
              <p>{todo.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default ToDoList;
