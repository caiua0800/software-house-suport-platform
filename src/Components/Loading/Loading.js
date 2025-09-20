// src/Components/Loading/Loading.js
import React from "react";
import styles from "./styles";

const Loading = () => {
  return (
    <>
      {/* Injeta as animações @keyframes na página */}
      <style>{styles.keyframes}</style>

      <div style={styles.overlay}>
        <svg style={styles.spinner} viewBox="25 25 50 50">
          <circle
            style={styles.path}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </>
  );
};

export default Loading;
