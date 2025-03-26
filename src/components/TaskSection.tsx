import { Task } from '../types';
import TaskCard from './TaskCard';

interface Props {
  title: string;
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

export default function TaskSection({ title, tasks, onToggle, onDelete, onEdit }: Props) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 shadow-md">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">{title}</h2>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks yet.</p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}
