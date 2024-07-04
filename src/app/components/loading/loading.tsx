import { Box } from "@mui/material";
import styles from "./loading.module.css";
import { PowerIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export default function Loading() {
  const powerIconClassName = classNames(
    styles.bounce,
    "w-24 h-24 m-auto mb-8 block text-sky-300",
  );

  const bouncingLetterClassName = classNames(styles.bounce, "inline-block");

  return (
    <Box className={styles.fadeIn}>
      <h1 className="text-4xl font-bold tracking-widest">
        <PowerIcon className={powerIconClassName} />
        <span>
          {"Loading...".split("").map((letter, index) => (
            <span key={index} className={bouncingLetterClassName}>
              {letter}
            </span>
          ))}
        </span>
      </h1>
    </Box>
  );
}
