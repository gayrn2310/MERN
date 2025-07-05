import Note from '../models/Note.js';

export async function getAllNotes (req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error: error.message });
  }
}

export async function getNoteById (req, res) {
  try {
    const { id } = req.params;
    const notes = await Note.findById(id);
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error: error.message });
  }
}

export async function createNote (req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error: error.message });
  }
}

export async function updateNote (req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const updateNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updateNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    res.status(200).json({ message: "Note updated successfully", note: updateNote });
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error: error.message });
  }
}   

export async function deleteNote (req, res) {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error: error.message });
  } 
}