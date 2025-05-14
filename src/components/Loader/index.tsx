import ReactDOM from "react-dom";
import { Spinner } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";

interface loaderProps {
  isLoading: boolean;
}
export default function Loader({ isLoading }: loaderProps) {
  const [loaderRoot, setLoaderRoot] = useState<Element | null>(null);

  useEffect(() => {
    const elemenLoader = document.getElementById("loader-root");
    if (elemenLoader) {
      setLoaderRoot(elemenLoader);
    }
  }, []);

  if (!isLoading || !loaderRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <Spinner size="xl" color="var(--cyan-500)" />
    </div>,
    loaderRoot
  );
}
