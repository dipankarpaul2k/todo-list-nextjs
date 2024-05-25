"use client";
import { useEffect, useState } from "react";
import useTodoStore from "@/store/useTodoStore";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  const { setTodos } = useTodoStore();
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

  return (
    <>
      <TodoForm />
      {/* <TodoList /> */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <TodoList />
      )}
    </>
  );
}
