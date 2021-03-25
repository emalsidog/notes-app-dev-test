// Dependencies
import React from "react";

// Components
import MainLayout from "../main-layout";
import ListsItem from "../lists-item";

// Styles
import styles from "./lists.module.css";

const Lists = ({ lists }) => {
  return (
    <MainLayout>
      <ol className={styles.list}>
        {lists.map((list) => (
          <ListsItem key={list._id} list={list} />
        ))}
      </ol>
    </MainLayout>
  );
};

export default Lists;
