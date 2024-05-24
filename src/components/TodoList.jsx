"use client";
import { useEffect, useState } from "react";
import useTodoStore from "@/store/useTodoStore";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function TodoList() {
  const { setTodos, todos } = useTodoStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/todos", {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("failed to fetch the todos");
        }
        const data = await response.json();
        setTodos(data.todos);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching the todos", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, [setTodos]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <p className="text-center font-semibold sm:font-bold text-xl sm:text-2xl">
        Todos
      </p>
      <ul className="list-disc">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`flex items-center my-2 ${
              todo.completed ? "line-through" : ""
            }`}
          >
            <span
              onClick={() => toggleTodo(todo._id)}
              className="flex-grow cursor-pointer"
            >
              {todo.text}
            </span>
            <Link
              href={`/edit/${todo._id}`}
              className="ml-2 p-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </Link>
            <RemoveBtn id={todo._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
