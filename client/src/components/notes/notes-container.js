// Dependencies
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Components
import Notes from "./notes";

// Service
import Service from "../../services/service";
const service = new Service();

const NotesContainer = ({ setState, state }) => {
  const { id } = useParams();

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    service
      .getNotes(id)
      .then((data) => {
        if (data.body.notes) {
          setState((prevState) => ({
            ...prevState,
            notes: data.body.notes,
            isLoading: false,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            error: data.error,
            isLoading: false,
          }));
        }
      })
      .catch((e) => console.error(e));
  }, [setState, id]);

  return <Notes setState={setState} isLoading={state.isLoading} lists={state.lists} notes={state.notes} />;
};

export default NotesContainer;
