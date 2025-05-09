import styles from "./style.module.scss";
import { ReactNode, useState } from "react";
import { IoClose } from "react-icons/io5";
interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function DrawerMenu({ isOpen, onClose, children }: SideDrawerProps) {
  return (
    <aside className={`${styles.container} ${isOpen ? styles.open : ""}`}>
      <button className={styles.buttonCloseDrawer} onClick={onClose}>
        <IoClose size={25} />
      </button>
      {children}
    </aside>
  );
}

export default DrawerMenu;
