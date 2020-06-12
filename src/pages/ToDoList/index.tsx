import React, { useState, FormEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { User } from "../../store/ducks/auth/types";
import { ApplicationState } from "../../store";

import "./styles.css";

interface ToDo {
  id: number;
  title: string;
  description: string;
  checked: boolean;
}

interface ToAddToDoState {
  title: string;
  description: string;
}

interface ToDoListState {
  user: User | null;
}

type HTMLInput = HTMLInputElement & HTMLTextAreaElement;

const ToDoList: React.FC = () => {
  const { user } = useSelector<ApplicationState, ToDoListState>((state) => ({
    user: state.auth.user,
  }));

  console.log(user);

  const [newTodo, setNewTodo] = useState<ToAddToDoState>({
    title: "",
    description: "",
  });

  const [todos, setTodos] = useState<ToDo[]>([
    {
      id: 1,
      title: "Todo 1",
      description: "Descrição do primeiro todo",
      checked: true,
    },
    {
      id: 2,
      title: "Todo 2",
      description: "Descrição do segundo todo",
      checked: false,
    },
    {
      id: 3,
      title: "Todo 3",
      description: "Descrição do terceiro todo",
      checked: true,
    },
  ]);

  function handleAddNewTodo(event: FormEvent) {
    event.preventDefault();

    const toAddToDo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title: newTodo.title,
      description: newTodo.description,
      checked: false,
    };

    setTodos([...todos, toAddToDo]);
    setNewTodo({
      title: "",
      description: "",
    });
  }

  function handleChange(event: ChangeEvent<HTMLInput>) {
    const { name, value } = event.currentTarget;
    setNewTodo({ ...newTodo, [name]: value });
  }

  return (
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
                onChange={() => {}}
              />
              <strong>{todo.title}</strong>
            </header>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
