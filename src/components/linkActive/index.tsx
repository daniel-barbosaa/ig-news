import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { ReactElement, cloneElement} from "react"

interface linkActiveProps extends LinkProps{
    children: ReactElement;
    activeClassName: string;
}

export function LinkActive ({children, activeClassName, ...rest}: linkActiveProps) {
    const {asPath} = useRouter()

    const className = asPath === rest.href ? activeClassName : ''
    return ( 
        <Link {...rest}>
         {cloneElement(children, {
            className
         })}
        </Link>
    )
}