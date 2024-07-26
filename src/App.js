import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/home/Home';
import EditNote from '../src/pages/Edit/EditNote';
import { getNotes, saveNotes } from '../src/localStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [notes, setNotes] = useState(getNotes());

  const addNote = (note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    saveNotes(newNotes);
    toast.success('Note added successfully!');
  };

  const editNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    toast.success('Note Edit successfully!');
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    saveNotes(filteredNotes);
    toast.success('Note Delete successfully!');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              notes={notes}
              addNote={addNote}
              deleteNote={deleteNote}
              editNote={editNote}
            />
          }
        />
        <Route path="/edit/:id" element={<EditNote editNote={editNote} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;