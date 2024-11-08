import { createContext } from "react";

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const value = {

    }

    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider