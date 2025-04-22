import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Portal
  } from '@chakra-ui/react'
import styles from './style.module.scss'

import { Avatar } from '@chakra-ui/react'

import Link from "next/link"
import { ExternalLinkIcon } from '@chakra-ui/icons'

import { useSession } from 'next-auth/react'



export function ButtonProfile () {

    const session = useSession()
    
    
    return (
        <Menu >
            <MenuButton>
            <Avatar name={`${session.data?.user?.name}`}  />
            </MenuButton>
            <Portal>
                <MenuList bg={"#1f2729"} className={styles.menuListContent}>
                <MenuItem className={`${styles.MenuListItem} ${styles.iconItemContent}`}>
                    <Link href="/account" className={styles.teste} legacyBehavior><a>Conta <ExternalLinkIcon/></a></Link>
                </MenuItem>
                <MenuItem className={styles.MenuListItem}>Settings</MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    )
    
}