import { useEffect, useState } from 'react';
import { Task } from './types';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskSection from './components/TaskSection';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  };

  const editTask = (id: number, newTitle: string) => {
    setTasks(tasks =>
      tasks.map(task => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const openTasks = tasks.filter(task => !task.completed);
  const doneTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        <TaskForm onAdd={addTask} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaskSection
            title="🟢 Open Tasks"
            tasks={openTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
          <TaskSection
            title="✅ Completed Tasks"
            tasks={doneTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      </div>
    </div>
  );
}
