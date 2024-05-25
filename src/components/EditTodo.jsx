"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import useTodoStore from "@/store/useTodoStore";

export default function EditTodo() {
  const { id } = useParams();
  const { todos, editTodo } = useTodoStore();
  const router = useRouter();
  const [text, setText] = useState("");

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      setText(todo.text);
    } else {
      toast.error("Todo not found.", {
        icon: "😟",
      });
    }
  }, [id, todos]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text) {
      toast.error("Text is required.", {
        icon: "😟",
      });
      return;
    }

    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (res.ok) {
      editTodo(data.updatedTodo);
      router.push("/");
    } else {
      toast.error(data.message, {
        icon: "😟",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Edit todo"
          className="flex-grow p-2 border border-gray-300 rounded"
          autoComplete="off"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-95"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
