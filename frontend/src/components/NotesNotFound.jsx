import React from 'react';
import { FileXIcon, Notebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotesNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-md bg-base-100 p-8 rounded-xl shadow-md">
        <Notebook className="mx-auto text-error w-12 h-12 mb-4" />
        <h1 className="text-2xl font-bold text-error mb-2">No Notes Yet</h1>
        <p className="text-gray-600">
          We couldn’t find any notes. Try creating one or check your filters.
        </p>
        <Link to={"/create"} className="btn btn-primary mt-5">
            <span>Create a new note</span>                   
        </Link>
      </div>
    </div>
  );
};

export default NotesNotFound;
