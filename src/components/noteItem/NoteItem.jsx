import React from 'react';
import { Link } from 'react-router-dom';

const NoteItem = ({ note, deleteNote }) => {
    return (
        <div className="ml-4 mr-4 p-3 mb-4 border border-gray-400 rounded">
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p className="mb-2">{note.content}</p>
            <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-2">
                    <button
                        onClick={() => deleteNote(note.id)}
                        className="p-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                    <Link to={`/edit/${note.id}`} className="p-2 bg-yellow-500 text-white rounded">
                        Edit
                    </Link>
                </div>
                <p className="text-sm text-gray-500 text-right">{note.timestamp}</p>
            </div>
        </div>
    );
};

export default NoteItem;
