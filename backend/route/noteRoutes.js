const express = require ("express");
const authMiddleware = require ("../middlewhare/authMiddleware");
const {createNote, getNote, updateNote, deleteNote} = require ("../controllers/noteControllers");
const router = express.Router();

router.post("/notes",authMiddleware,createNote);
router.get("/notes",authMiddleware,getNote);
router.put("/notes/:id",authMiddleware,updateNote);
router.delete("/notes/:id",authMiddleware,deleteNote);

module.exports = router;