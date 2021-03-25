// Dependencies
import React, { useState } from "react";
import moment from "moment";

// Antd components
import { DatePicker, Modal, Space } from "antd";

// Styles
import styles from "./notes-item.module.css";

// Service
import Service from "../../services/service";
const service = new Service();

const NotesItem = ({ note, setState }) => {
  const { title, date, description } = note;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dateValue, setDateValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const actuality = moment(`${date}`).format("MM-DD-YYYY");

  const onDateChange = (date, dateString) => {
    setDateValue(dateString);
  };

  const onInputChange = (e) => {
    setTitleValue(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const editNote = async () => {
    const data = {
      noteId: note._id,
      titleValue,
      descriptionValue,
      dateValue,
    };
    const response = await service.editNote(data);
    setState((prevState) => {
      const { notes } = prevState;
      const newNotes = notes.map((note) => {
        if (note._id === response.body.note._id) {
          return response.body.note;
        } else {
          return note;
        }
      });
      return {
        ...prevState,
        notes: newNotes,
      };
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    editNote();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={styles.container}>
        <h3>
          {title} | Actuality: {actuality}
        </h3>
        <p>{description ? description : "No description"}</p>
        <div>
          <button onClick={showModal}>Edit</button>
        </div>
      </div>

      <Modal
        title="Editing..."
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label>Title</label>
          <br />
          <input
            onChange={onInputChange}
            value={titleValue}
            placeholder={title}
          />
        </div>
        <div>
          <label>Description</label>
          <br />
          <textarea
            onChange={onDescriptionChange}
            value={descriptionValue}
            placeholder={description}
          ></textarea>
        </div>
        <div>
          <label>Date</label>
          <br />
          <Space direction="vertical">
            <DatePicker onChange={onDateChange} />
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default NotesItem;
