import { create } from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo._id !== id) })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  editTodo: (updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      ),
    })),
}));

export default useTodoStore;
