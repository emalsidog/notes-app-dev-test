// Dependencies
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Components
import HomeContainer from "../home";
import Lists from "../lists";
import NotesContainer from "../notes";

// Service
import Service from "../../services/service";
const service = new Service();

const App = () => {
  const [state, setState] = useState({
    lists: [],
    notes: [],
    isLoading: false,
    error: {
      isError: false,
      message: ""
    }
  })

  useEffect(() => {
    service
      .getLists()
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          lists: data.body.lists,
        }));
      })
      .catch((e) => console.error(e));
  }, [setState]);

  return (
    <BrowserRouter>
      <Route exact path="/"><HomeContainer lists={state.lists} setState={setState} /></Route>
      <Route exact path="/lists"><Lists lists={state.lists} /></Route>
      <Route exact path="/lists/:id"><NotesContainer state={state} setState={setState} /></Route>
    </BrowserRouter>
  )
}

export default App;