"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IconTrash } from "@tabler/icons-react";
import useTodoStore from "@/store/useTodoStore";

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
    removeTodo(id); // Update the todos state
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-2 p-2 bg-red-500 text-white rounded"
    >
      <span className="max-sm:hidden">Delete</span>
      <IconTrash className="sm:hidden" />
    </button>
  );
};

export default RemoveBtn;
