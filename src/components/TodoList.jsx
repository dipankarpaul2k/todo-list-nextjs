"use client";
import useTodoStore from "@/store/useTodoStore";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function TodoList() {
  const { todos } = useTodoStore();

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
              // onClick={() => toggleTodo(todo._id)}
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
