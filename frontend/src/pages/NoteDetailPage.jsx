import React, { use } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';
import axiosInstance from '../lib/axios';
import { Link } from 'react-router-dom';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    } catch (error) {
      if (error.response.status === 429) {
        toast.error('Slow down! You are making too many requests.', {
          duration: 5000,
          icon: '💀',
        });
      } else {
        toast.error('Failed to delete note');
      }
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Title and content cannot be empty');
      return;
    }
    setSaving(true);
    try {
      await axiosInstance.put(`/notes/${note._id}`, note);
      toast.success('Note updated successfully');
      navigate('/');
    } catch (error) { 
      if (error.response && error.response.status === 429) {
        toast.error('Slow down! You are making too many requests.', {
          duration: 5000,
          icon: '💀',
        });
      } else {
        toast.error('Failed to save note');
      }
    }
    setSaving(false);
  }

  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error('Error fetching note:', error);
        toast.error('Failed to load note');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if(isLoading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center py-10'>
        <LoaderIcon className='animate-spin size-8' />
        <p>Loading note...</p>
      </div>
    );
  }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className='btn btn-ghost'>
              <ArrowLeftIcon className='size-5' />
              Back
            </Link>
            <button 
              className='btn btn-error btn-outline'
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className='size-5' />
              Delete
            </button>
          </div>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className="form-control mg-4">
                <label className='label'>
                <span className='label-text'>Title</span>
                </label>
                <input 
                  type="text" 
                  placeholder='Note Title' 
                  className='input input-bordered' 
                  value={note.title} 
                  onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>
              <div className="form-control mg-4">
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea 
                  placeholder='Note Content' 
                  className='textarea textarea-bordered h-32' 
                  value={note.content} 
                  onChange={(e) => setNote({...note, content: e.target.value})}
                />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? (
                    <span className='flex items-center'>
                      <LoaderIcon className='animate-spin size-5 mr-2' />
                      Saving...
                    </span>
                  ) : (
                    'Save Note'
                  )}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage