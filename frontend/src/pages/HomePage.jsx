import React, { use } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import axiosInstance from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';


const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get('/notes');
        setNote(res.data);
        setRateLimited(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response && error.response.status === 429) {
          setRateLimited(true);
        } else {
          toast.error('Fail to load notes');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, []); 

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-8'>
        {isLoading && <div className='text-center text-primary py-10'>Loading...</div> } 
        {note.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {note.map((n) => (
              <NoteCard
                key={n._id} note={n} setNote={setNote} />
            ))}
          </div>
        )}

        {note.length === 0 && !isRateLimited && <NotesNotFound />}
      </div>
    </div>
  )
}

export default HomePage