import React, { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditNote = ({ editNote, addNote }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    useEffect(() => {
      if (id !== 'new') {
        
        const existingNote = JSON.parse(localStorage.getItem('notes')).find(note => note.id === parseInt(id));
        if (existingNote) {
          setTitle(existingNote.title);
          setContent(existingNote.content);
        }
      }
    }, [id]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const note = {
        id: id === 'new' ? Date.now() : parseInt(id),
        title,
        content,
        timestamp: new Date().toLocaleString(),
      };
      id === 'new' ? addNote(note) : editNote(note);
      navigate('/');
    };
  
    return (
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="p-4 border rounded">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border rounded h-40 mb-2"
          ></textarea>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {id === 'new' ? 'Add Note' : 'Update Note'}
          </button>
        </form>
      </div>
    );
  };
  
  export default EditNote;