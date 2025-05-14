import Image from "next/image";
import logoImg from "../../../public/logo.png";
import styles from "./style.module.scss";
import { FaBars } from "react-icons/fa";
import { SignButton } from "../SingInButton";
import { LinkActive } from "../LinkActive";
import { ButtonProfile } from "../ButtonProfile";
import DrawerMenu from "../DrawerMenu";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const session = useSession();
  const userIsLogged = session.data === null ? undefined : session.data;

  useEffect(() => {
    function handleCloseMenu() {
      setMenuIsOpen(false);
    }
    router.events.on("routeChangeStart", handleCloseMenu);

    return () => {
      router.events.off("routeChangeStart", handleCloseMenu);
    };
  }, [router]);

  const handleMenuToggle = useCallback(() => {
    setMenuIsOpen((prevState) => !prevState);
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoImg} alt="ig.news" width={101} height={30.5} />
        <nav>
          <LinkActive href="/" legacyBehavior activeClassName={styles.active}>
            <a>Home</a>
          </LinkActive>
          <LinkActive
            href="/posts"
            legacyBehavior
            activeClassName={styles.active}
          >
            <a>Post</a>
          </LinkActive>
        </nav>
        <div className={styles.headerProfileContent}>
          <SignButton />
          {userIsLogged && <ButtonProfile />}
        </div>

        <div className={styles.headerActions}>
          {userIsLogged && <ButtonProfile />}
          <button
            className={styles.buttonOpenDrawer}
            onClick={handleMenuToggle}
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>
      <DrawerMenu isOpen={menuIsOpen} onClose={handleMenuToggle}>
        <nav className={styles.drawerNav}>
          <span>Main</span>
          <LinkActive href="/" legacyBehavior activeClassName={styles.active}>
            <a>Home</a>
          </LinkActive>
          <LinkActive
            href="/posts"
            legacyBehavior
            activeClassName={styles.active}
          >
            <a>Post</a>
          </LinkActive>
          <span>Account</span>
          <LinkActive
            href="/account"
            legacyBehavior
            activeClassName={styles.active}
          >
            <a>Signatures</a>
          </LinkActive>
          <LinkActive href="" legacyBehavior activeClassName={styles.active}>
            <a>Settings</a>
          </LinkActive>
        </nav>
        <div className={styles.drawerSectionProfile}>
          <SignButton />
        </div>
      </DrawerMenu>
    </header>
  );
}

export default Header;
