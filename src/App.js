import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import { getDocs, addDoc, deleteDoc, doc, updateDoc, collection } from "firebase/firestore";
import { ref,uploadBytes } from 'firebase/storage';

function App() {
  //To display movies
  const [movieList, setMovieList] = useState([]);

  //New movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("")

  //File upload state
  const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    //READ THE DATA
    //SET THE MOVIE LIST
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  },[]);

  const onSubmitMovie = async () => {
    try{
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      });
      getMovieList();
    } catch(err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db,"movies",id)
    await deleteDoc(movieDoc)
    getMovieList();
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db,"movies",id)
    await updateDoc(movieDoc,{title:updatedTitle})
    getMovieList();
  }


  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try{
      await uploadBytes(filesFolderRef, fileUpload)
    } catch(err) {
      console.error(err);
    }
    
  }

  return (
    <div className="App">
      <Auth />

      <hr />
      <div>
        <input
          placeholder="Movie title..."
          type="text"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <br />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
        />
        <br />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received An Oscar</label>
        <br />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <hr />
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p> Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button><br /><br />

            <input placeholder="new title..." onChange={(e) => setUpdatedTitle(e.target.value) } /><br/>
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>

    </div>
  );
}

export default App;
