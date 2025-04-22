import { FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'
import {signIn, signOut, useSession} from 'next-auth/react'


export function SignButton () {
    const {data: session} = useSession()
    return session ? (
        <button type="button" 
        className={styles.signInButton}
        >
            <FaGithub color='#04d361'/>
          {session.user?.name}
            <FiX color='#737380' className={styles.closeIcons} onClick={() => {
                signOut()
            }}/>
        </button>
    ) :  <button type="button" 
    className={styles.signInButton}
    onClick={() => {
        signIn('github')
    }}
    >
        <FaGithub color='#eba417'/>
        Sign in with Github
    </button>
}

export default SignButton