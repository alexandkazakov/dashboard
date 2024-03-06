import styles from "./SaveIcon.module.scss";

export const SaveIcon = () => {
  return (
    <div className={styles["SaveIcon"]}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.02344 7.01904L6.16064 12L15.0234 3.01904"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
