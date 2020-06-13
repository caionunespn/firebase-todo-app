import React, { useState, FormEvent, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToDo } from "../../store/ducks/todos/types";
import { addToDo, toggleToDo } from "../../store/ducks/todos/actions";
import { ApplicationState } from "../../store";
import MainLayout from "../../layouts/MainLayout";

import "./styles.css";

interface ToAddToDoState {
  title: string;
  description: string;
}

type HTMLInput = HTMLInputElement & HTMLTextAreaElement;

const ToDoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector<ApplicationState, ToDo[]>(
    (state) => state.todos.data
  );

  const [newTodo, setNewTodo] = useState<ToAddToDoState>({
    title: "",
    description: "",
  });

  function handleAddNewTodo(event: FormEvent) {
    event.preventDefault();

    const toAddToDo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title: newTodo.title,
      description: newTodo.description,
      checked: false,
    };

    dispatch(addToDo(toAddToDo));
    setNewTodo({
      title: "",
      description: "",
    });
  }

  function handleChange(event: ChangeEvent<HTMLInput>) {
    const { name, value } = event.currentTarget;
    setNewTodo({ ...newTodo, [name]: value });
  }

  function handleToggleToDo(id: number) {
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
