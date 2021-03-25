// Dependencies
import React, { useState } from "react";

// Components
import MainLayout from "../main-layout";
import ListPicker from "../list-picker";

// Antd components
import { Modal, Button, Input, DatePicker, Space } from "antd";

// Styles
import styles from "./home.module.css";

// Home component
const Home = (props) => {
  const {
    setDate,
    setListValue,
    register,
    handleSubmit,
    errors,
    lists,
    onAddNoteSubmit,
    onAddListSubmit
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const onDateChange = (date, dateString) => {
    setDate(dateString);
  };

  const onSelectChange = (value) => {
    setListValue(value);
  };

  const onNewTitleChange = (e) => {
    setNewListTitle(e.target.value);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    onAddListSubmit(newListTitle);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onAddNoteSubmit)}>
          <div className={styles.formControl}>
            <label>Note title</label>
            <br />
            <input
              autoFocus
              autoComplete="off"
              placeholder="Note title"
              name="title"
              ref={register({
                required: "Required field",
                minLength: {
                  value: 5,
                  message: "Minimal number of characters is 5",
                },
              })}
            />
            {errors.title && (
              <div className={styles.error}>{errors.title.message}</div>
            )}
          </div>

          <div className={styles.formControl}>
            <label>Note description</label>
            <br />
            <textarea
              name="description"
              placeholder="Note description"
              ref={register()}
            />
          </div>

          <div className={styles.formControl}>
            <label>Date of relevance</label>
            <br />
            <Space direction="vertical">
              <DatePicker onChange={onDateChange} />
            </Space>
          </div>

          <div className={styles.formControl}>
            <ListPicker onSelectChange={onSelectChange} lists={lists} />
            <Button onClick={showModal}>Add list</Button>
          </div>

          <button type="submit">Add note</button>
        </form>

        <Modal
          title="Create new list"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input onChange={onNewTitleChange} value={newListTitle} placeholder="Type here..." />
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Home;
