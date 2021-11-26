import React, { createContext, useState } from "react";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
    const [page, setPage]               = useState("indexPage");
    const [school, setSchool]           = useState("all");
    const [spellCategory, setSpellCategory]  = useState("all");
    const [spell, setSpell]             = useState("none");
    const [headerTitle, setHeaderTitle] = useState("FluxRPG Spell List");

    return (
        <AppContext.Provider
            value={{
                page,
                school,
                spell,
                spellCategory,
                headerTitle,
                setPage,
                setSchool,
                setSpell,
                setSpellCategory,
                setHeaderTitle,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
