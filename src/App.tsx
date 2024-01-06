// App.tsx
import React from 'react';
import { TaskProvider } from './hooks/TaskContext';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="App">
        <TodoList />
      </div>
    </TaskProvider>
  );
};

export default App;


