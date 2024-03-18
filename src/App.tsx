// App.tsx
import React from "react";
import { TaskProvider } from "./hooks/TaskContext";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Todos from "./TRY/apiTodos";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/api-todos" element={<Todos />} />
        </Routes>
      </div>
    </TaskProvider>
  );
};

export default App;
