import { useEffect, useState } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingid,setEditingid] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  const createNote = () => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(data => {
        setNotes([...notes, data]);
        setTitle("");
        setContent("");
      });
  };

  function DeleteNotes (id) {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
      method:"DELETE",
      headers:{
      Authorization:"Bearer " + token
      }
    })
    .then(
      () =>{
        setNotes(notes.filter(notes => notes._id !==id));
      }
    )
  }
  function updateNote (id) {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer " + token
      },
      body:JSON.stringify({title ,content})
    }
    )
    .then(res => res.json())
    .then(updateNote => {
      setNotes(notes.map(note => note._id === id ? updateNote: note))
      setEditingid(null);
      setTitle("");
      setContent("");
    })
  }

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setNotes(data);
        setLoading(false);
      }
    })
    .catch(err => console.log(err));
            setLoading(false);

}, []);

if(loading){
  return <p>Loading notes........</p>
}
if (error){
  return <p>{error}</p>
}

  return (
    
    <div>
      <h1>Notes</h1>
      

      {notes.map(note => (
        <div key={note._id}>
          <h3>Title:{note.title}</h3>
          <p>Content:{note.content}</p>

        <button onClick={() => DeleteNotes(note._id)}>Delete</button>
         <button onClick={() =>{
        setEditingid(note._id);
        setTitle(note.title);
        setContent(note.content);
      }}>Edit</button>
        </div>
      ))}

      <input
        type="text"
        placeholder="enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={editingid ? () => updateNote(editingid) : createNote}>
  {editingid ? "Update Note" : "Add Note"}
</button>
     
    </div>
  );
}

export default Notes;