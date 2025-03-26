import { useState, useRef, useEffect } from 'react';
import { Task } from '../types';
import { CheckCircle, RotateCcw, Trash2, Pencil } from 'lucide-react';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
      {isEditing ? (
        <input
          ref={inputRef}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
          className="flex-1 p-1 text-black rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <span
          className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
        >
          {task.title}
        </span>
      )}

      <div className="flex items-center gap-2 ml-3">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-gray-700">
            <Pencil size={18} />
          </button>
        )}
        <button onClick={() => onToggle(task.id)} className="text-indigo-500 hover:text-indigo-700">
          {task.completed ? <RotateCcw size={20} /> : <CheckCircle size={20} />}
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-400 hover:text-red-600">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
