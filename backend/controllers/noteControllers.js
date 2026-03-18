const Note = require("../model/Note");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = new Note({
      title,
      content,
      userId: req.user?.id, // optional chaining in case req.user is missing
    });

    await note.save();
    res.json(note);

  } catch (error) {
    console.error("Error creating note:", error); // <-- log the real error
    res.status(500).json({ message: error.message });
  }
};

const getNote = async (req,res) =>{
    try{
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    }catch(err){
        res.status(500).json({message:"server error"});
    }
}

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title && !content) {
      return res.status(400).json({ message: "At least one field (title or content) is required" });
    }

    // Update note
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true } // runValidators ensures Mongoose schema rules are checked
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);

  } catch (error) {
    console.error("Error updating note:", error); // log full error
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req,res) =>{
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({message:"note deleted"});
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
}

module.exports = {createNote,deleteNote,updateNote,getNote};