import { createContext, useContext } from "react";

const DiscoverContext = createContext();

export const DiscoverContextProvider = (props) => {
    return (
        <DiscoverContext.Provider value={{}}>
            {props.children}
        </DiscoverContext.Provider>
    )
}