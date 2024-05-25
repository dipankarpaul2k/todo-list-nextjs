"use client";
import React from "react";
import useTodoStore from "@/store/useTodoStore";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }) => {
  const { setTodos, todos, removeTodo } = useTodoStore();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setError("Error deleting todo");
    }

    // const updatedTodo = todos.filter((todo) => todo.id !== id);
    // setTodos(updatedTodo);
    removeTodo(id); // Update the todos state

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-2 p-2 bg-red-500 text-white rounded"
    >
      Delete
    </button>
  );
};

export default RemoveBtn;
