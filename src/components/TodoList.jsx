"use client";
import { useState } from "react";
import useTodoStore from "@/store/useTodoStore";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { IconPencil } from "@tabler/icons-react";

export default function TodoList() {
  const { todos, toggleTodo } = useTodoStore();
  const [error, setError] = useState(null);

  const toggle = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    const data = await response.json();

    if (response.ok) {
      toggleTodo(id);
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <h1 className="text-center font-semibold sm:font-bold text-xl sm:text-2xl">
        Todos
      </h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ul className="list-disc">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`flex items-center my-2 ${
              todo.completed ? "line-through" : ""
            }`}
          >
            <span
              onClick={() => toggle(todo._id)}
              className="flex-grow cursor-pointer"
            >
              {todo.text}
            </span>
            <Link
              href={`/edit/${todo._id}`}
              className={`ml-2 p-2 bg-yellow-500 text-white rounded ${
                todo.completed ? "pointer-events-none bg-gray-300" : ""
              }`}
              aria-disabled={todo.completed}
              tabIndex={todo.completed ? -1 : undefined}
            >
              <span className="max-sm:hidden">Edit</span>
              <IconPencil className="sm:hidden" />
            </Link>
            <RemoveBtn id={todo._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
