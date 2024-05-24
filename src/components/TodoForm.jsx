"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoForm() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const target = event.currentTarget;
    const formData = new FormData(target);

    const text = formData.get("text");

    if (!text) {
      setSuccess("");
      setError("Text is required.");
      return;
    }

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const newTodo = await res.json();

    if (res.ok) {
      setSuccess("Todo created successfully");
      setError(null);
      router.refresh();
    } else {
      setSuccess("");
      setError(newTodo.message);
    }

    target.reset();
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          name="text"
          placeholder="Add a new todo"
          className="flex-grow p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-95"
        >
          Add New Todo
        </button>
      </form>
      <div className="text-sm">
        {success && <p className="text-blue-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
