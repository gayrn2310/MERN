import React from 'react'
import { Link } from 'react-router-dom'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils'
import axiosInstance from '../lib/axios'
import { toast } from 'react-hot-toast'


const NoteCard = ({note, setNote}) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if(!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNote((prev) => prev.filter((n) => n._id !== id));
      toast.success('Note deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error('Slow down! You are making too many requests.', {
          duration: 5000,
          icon: '💀',
        });
      } else {
        toast.error('Failed to delete note');
      }
    }
  }
  return <Link to={`/note/${note._id}`} className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-solid border-[#00ff9d]'>
    <div className='card-body'>
      <h3 className='card-title text-base-content '>
        {note.title}
      </h3>
      <p className='text-base-content/70 line-clamp-3'>
        {note.content}
      </p>
      <div className='card-actions justify-between items-center mt-4'>
        <span className='text-base-content/60 text-sm'>{formatDate(note.createdAt)}</span>
        <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-5' />
            <button className='btn btn-error btn-outline' onClick={(e) => handleDelete(e, note._id)}>
                <Trash2Icon className='size-5' />
            </button>
        </div>
      </div>
    </div>
  </Link>
}

export default NoteCard