"use client";
import toast from "react-hot-toast";
import useTodoStore from "@/store/useTodoStore";

export default function TodoForm() {
  const { addTodo } = useTodoStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const target = event.currentTarget;
    const formData = new FormData(target);

    const text = formData.get("text");

    if (!text) {
      toast.error("Text is required.", {
        icon: "😟",
      });
      return;
    }

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (response.ok) {
      addTodo(data.newTodo);
      toast.success("Todo created successfully!", {
        icon: "😃",
      });
    } else {
      toast.error(data.message, {
        icon: "😟",
      });
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
    </div>
  );
}
