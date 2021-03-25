// Dependencies
import React from "react";

// Components
import MainLayout from "../main-layout";
import NotesItem from "../notes-item";

const Notes = ({ setState, isLoading, notes, lists }) => {
  let render = isLoading ? (
    <span>Loading...</span>
  ) : (
    <div>
      {notes.map((note) => (
        <NotesItem setState={setState} key={note._id} note={note} lists={lists} />
      ))}
    </div>
  );
  return <MainLayout>{render}</MainLayout>;
};

export default Notes;
