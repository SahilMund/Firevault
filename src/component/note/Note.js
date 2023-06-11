import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CreateNote from "./CreateNote";
import Notes from "./Notes";

import "../../styles/notes.css";
import {
  addNotesToFirebase,
  deleteNotesFromFirebase,
} from "../../helpers/firebase-notes";
import useFirestore from "../../hooks/useFirestore";

//bootstrap css and js imports
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { useAuth } from "../../contexts/AuthContext";

function Note() {
  const { docs } = useFirestore("notes");

  // const [noteList, setNoteList] = useState([]); //for other notes
  // const [pinnedNotelist, updatePinnedNoteList] = useState([]); //for pinned notes
  const [mode, updateMode] = useState(""); //for theme change
  const [instruction, updateInstruction] = useState(true);
  const [currentView, setCurrentView] = useState("grid"); // View can be - grid / list
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!searchText) return setFilteredData([]);

    const filtered = docs.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(filtered);
  }, [searchText]);

  const dataSource =
    filteredData && filteredData.length !== 0 ? filteredData : docs;

  const pinnedDocs = dataSource.filter((ele) => ele && ele.isPinned);
  const otherDocs = dataSource.filter((ele) => ele && !ele.isPinned);

  const addNote = async (note) => {
    if (note.title === "" && note.content === "") {
      console.log("Add a item first");
    } else {
      // setNoteList((oldItems) => {
      //   return [...oldItems, note];
      // });

      const data = {
        desc: note.content,
        title: note.title,
        user: currentUser.uid,
        isPinned: note.isPinned || false,
      };

      await addNotesToFirebase(data);
    }
    updateInstruction(false);
  };

  const deleteNote = async (id) => {
    // setNoteList((oldItems) => {
    //   return oldItems.filter((noteValue, noteIndex) => {
    //     return noteIndex !== id;
    //   });
    // });

    
    await deleteNotesFromFirebase(id);
  };

  // const pinNote = (note) => {
  //   if (note.title === "" && note.content === "") {
  //     alert("Add a item first");
  //   } else {
  //     updatePinnedNoteList((oldItems) => {
  //       return [...oldItems, note];
  //     });
  //   }
  //   updateInstruction(false);
  // };

  // const deletePinnedNote = (id) => {
  //   updatePinnedNoteList((oldItems) => {
  //     return oldItems.filter((noteValue, noteIndex) => {
  //       return noteIndex !== id;
  //     });
  //   });
  // };

  const changeMode = (state) => {
    if (state == "dark") {
      updateMode("darkMode");
    } else {
      updateMode("lightMode");
    }
  };

  const toggleSideNav = () => {};

  return (
    <>
      <Header
        changeMode={changeMode}
        navEvent={toggleSideNav}
        colorMode={mode}
        setCurrentView={setCurrentView}
        view={currentView}
        handleSearch={setSearchText}
        searchVal={searchText}
      />

      <div className="main-div-row" id={mode}>
        {/* side bar */}
        <div className="side-bar-col">
          <Sidebar />
        </div>
        {/* main div */}
        <div className="main-col">
          <CreateNote addHandler={addNote} />

          <h2 className="div-headings">Pinned</h2>

          <div className={`pinnedNoteBucket ${currentView}`}>
            {pinnedDocs?.map((note) => {
              return (
                <Notes
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.desc}
                  deleteEvent={deleteNote}
                />
              );
            })}
          </div>

          <h2 className="div-headings">Others</h2>

          <div className={`noteBucket ${currentView}`}>
            {instruction ? (
              <div className="instruction-div">
                <img
                  alt=""
                  src="https://img.icons8.com/color/240/000000/google-keep.png"
                />
                <p>Notes you add appear here</p>
              </div>
            ) : null}

            {otherDocs?.map((note) => {
              return (
                <Notes
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.desc}
                  deleteEvent={deleteNote}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Note;
