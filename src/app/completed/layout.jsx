"use client";
import { useEffect } from "react";
import useTodoStore from "@/store/useTodoStore";

const CompletedLayout = ({ children }) => {
  const { setTodos } = useTodoStore();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos", {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch the todos");
        }
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.log("Error fetching the todos", error);
      }
    };

    fetchTodos();
  }, [setTodos]);

  return <>{children}</>;
};

export default CompletedLayout;
