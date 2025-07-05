import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '../lib/axios';

const Createpage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required');
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post('/notes', {
        title, content
      });
      toast.success('Note created successfully');
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error('Slow down! You are making too many notes.', {
          duration: 5000,
          icon: '💀',
        });
      } else {
        toast.error('Failed to create note');
      }
    } finally {
      setIsLoading(false);
    }
    
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto '>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create a New Note</h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Enter note title'
                    className='input input-bordered w-full'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    placeholder='Enter content for your note'
                    className='textarea textarea-bordered w-full'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type='submit'
                    className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Createpage