import { useAuth } from "../../Hooks/useAuth"
// import { useRefreshQuery } from "../../redux/auth/sliceApi";
import { MenuLink } from "./NavigationStyled";

export const Navigation=()=>{
    const {isLoggedIn, user }=useAuth();
//    const {data:user}= useRefreshQuery()
    
    return (
        <nav>
            <MenuLink to ='/'>
            Home
            </MenuLink>
            {isLoggedIn&&user?.verify &&(
                <MenuLink to="/tasks">
                    Tasks
                </MenuLink>
            )}
        </nav>
    )
}