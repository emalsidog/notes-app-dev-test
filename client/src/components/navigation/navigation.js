// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./navigation.module.css";

const Navigation = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.listItem}><Link to="/">Home</Link></li>
        <li className={styles.listItem}><Link to="/lists">Lists</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation;