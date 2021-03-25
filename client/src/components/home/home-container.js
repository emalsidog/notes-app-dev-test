// Dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Components
import Home from "./home";

// Service
import Service from "../../services/service";
const service = new Service();

const HomeContainer = ({ lists, setState }) => {
  const [date, setDate] = useState("");
  const [listValue, setListValue] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const onAddNoteSubmit = async (data, e) => {
    e.target.reset();
    const dataToSend = { ...data, date, listId: listValue };
    await service.addNote(dataToSend);
  };

  const onAddListSubmit = async (newListTitle) => {
    const newList = await service.createList(newListTitle);
    setState(prevState => ({ ...prevState, lists: [...prevState.lists, newList] }))
  }

  return (
    <Home
      lists={lists}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onAddNoteSubmit={onAddNoteSubmit}
      setDate={setDate}
      setListValue={setListValue}
      onAddListSubmit={onAddListSubmit}
    />
  );
};

export default HomeContainer;
