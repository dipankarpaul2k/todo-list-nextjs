import { create } from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo._id !== id) })),
}));

export default useTodoStore;
