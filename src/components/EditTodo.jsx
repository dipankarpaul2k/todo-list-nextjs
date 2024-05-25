"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useTodoStore from "@/store/useTodoStore";

export default function EditTodo() {
  const { id } = useParams();
  const { todos, editTodo } = useTodoStore();
  const router = useRouter();
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      setText(todo.text);
    } else {
      setError("Todo not found");
    }
  }, [id, todos]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text) {
      setError("Text is required.");
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
      setError(data.message);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

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
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-95"
        >
          Save Changes
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
