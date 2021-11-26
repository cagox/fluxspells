import React, { createContext, useState } from "react";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
    const [page, setPage]               = useState("indexPage");
    const [school, setSchool]           = useState("all");
    const [category, setCategory]       = useState("all");
    const [spell, setSpell]             = useState("none");
    const [headerTitle, setHeaderTitle] = useState("FluxRPG Spell List");
    /* const [apiroot, setApiroot]         = useState("http://localhost:8080/api"); */

    return (
        <AppContext.Provider
            value={{
                page,
                school,
                spell,
                category,
                headerTitle,
                setPage,
                setSchool,
                setSpell,
                setCategory,
                setHeaderTitle,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
