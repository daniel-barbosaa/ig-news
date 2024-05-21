import Image from 'next/image'
import logoImg from '../../../public/logo.png'

import styles from './style.module.scss'
import { SignButton } from '../SingInButton'
import { useRouter } from 'next/router'
import { LinkActive } from '../linkActive'

import { ButtonProfile } from '../ButtonProfile'
import { useSession } from 'next-auth/react'

export function Header () {
    const session = useSession()
    const {asPath} = useRouter()

    const userIsLogged = session.data === null ? undefined : session.data

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>

                <Image src={logoImg} alt='ig.news' width={101} height={30.5} />
                    <nav>
                        <LinkActive href='/' legacyBehavior activeClassName={styles.active}>
                        <a >Home</a>
                        </LinkActive>
                        <LinkActive href='/posts' legacyBehavior activeClassName={styles.active}>
                        <a >Post</a>
                        </LinkActive>
                    </nav>
                <div className={styles.headerProfileContent}>
                    <SignButton/>
                    {userIsLogged && <ButtonProfile/>}
                </div>
                
            </div>
        </header>
    )
}

export default Header