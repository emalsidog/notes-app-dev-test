// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./lists-item.module.css";

const ListsItem = ({ list }) => {
  const { _id, title } = list;
  return (
    <div className={styles.container}>
      <Link to={`/lists/${_id}`}>{title}</Link>
    </div>
  );
};

export default ListsItem;
