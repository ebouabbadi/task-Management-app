import { FormEvent, useState } from 'react';

interface TaskFormProps {
  onAdd: (title: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow p-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </form>
  );
}
