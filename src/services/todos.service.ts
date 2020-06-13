import { firestore as db } from "../firebase";
import { ToDo } from "../store/ducks/todos/types";
import { ToDoFormSchema } from "../helpers/Forms/schemas";

export async function getUserToDos(id: string): Promise<ToDo[]> {
  const getTodos = await db.collection("todos").where("user", "==", id).get();

  const myToDos: ToDo[] = [];

  getTodos.forEach((todo) => {
    const { title, description, checked } = todo.data();

    return myToDos.push({
      id: todo.id,
      title,
      description,
      checked,
    });
  });

  return myToDos;
}

export async function createToDo(payload: ToDoFormSchema): Promise<ToDo> {
  const newToDo = await db.collection("todos").add({
    ...payload,
  });

  return {
    id: newToDo.id,
    description: payload.description,
    title: payload.title,
    checked: payload.checked,
  };
}
