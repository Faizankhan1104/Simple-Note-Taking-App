import React, { useState, useEffect } from 'react';

const NoteForm = ({ addNote, editNote, existingNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
    }
  }, [existingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: existingNote ? existingNote.id : Date.now(),
      title,
      content,
      timestamp: new Date().toLocaleString(),
    };
    existingNote ? editNote(newNote) : addNote(newNote);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 mb-2 border border-gray-400 rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full p-2 mb-2 border border-gray-400 rounded h-40"
      ></textarea>
      <button type="submit" className="p-2 bg-gray-700 text-white rounded">
        {existingNote ? 'Update' : 'Add'} Note
      </button>
    </form>
  );
};

export default NoteForm;
