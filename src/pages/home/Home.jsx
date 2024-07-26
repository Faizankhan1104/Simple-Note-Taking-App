import React, { useState, useEffect } from 'react';
import Modal from '../../components/Model';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/confirm';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Home = ({ notes, addNote, deleteNote, editNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const notesPerPage = 10;

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)

  }, [])

  const openModal = (note = null) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentNote(null);
    setIsModalOpen(false);
  };

  const openConfirmModal = (note) => {
    setNoteToDelete(note);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setNoteToDelete(null);
  };

  const handleSave = async (note) => {
    setLoading(true);
    try {
      if (currentNote) {
        await editNote(note);
        toast.success('Note updated successfully!');
      } else {
        await addNote(note);
        toast.success('Note added successfully!');
      }
      closeModal();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (noteToDelete) {
      try {
        await deleteNote(noteToDelete.id);
      } catch (error) {
        toast.error('Failed to delete note.');
      }
      setIsConfirmModalOpen(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalNotes = filteredNotes.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <HashLoader color="#3498db" />
        </div>
      ) :
        <div className="container mx-auto p-4">
          <div className="mb-4 flex flex-col gap-4">

            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          {currentNotes.map((note) => (
            <div key={note.id} className="p-3 mb-4 border rounded">
              <h3 className="text-lg font-bold">{note.title}</h3>
              <p>{note.content}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">{note.timestamp}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openConfirmModal(note)}
                    className="p-2 bg-red-500 text-white mt-3 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openModal(note)}
                    className="p-2 bg-yellow-500 text-white mt-3 rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Pagination
            notesPerPage={notesPerPage}
            totalNotes={totalNotes}
            paginate={paginate}
          />
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            note={currentNote}
            onSave={handleSave}
          />
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={closeConfirmModal}
            onConfirm={handleDelete}
            message="Do you want to delete this note?"
          />
          <button
            onClick={() => openModal()}
            className="p-2 bg-green-500 text-white rounded"
          >
            Add Note
          </button>
        </div>}

    </>
  );
};

export default Home;
