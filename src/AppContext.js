import React, { createContext, useState } from "react";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
    const [page, setPage]               = useState("indexPage");
    const [school, setSchool]           = useState("all");
    const [spellCategory, setSpellCategory]  = useState("all");
    const [spell, setSpell]             = useState("none");
    const [headerTitle, setHeaderTitle] = useState("FluxRPG Spell List");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState();
    const [user, setUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false)

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
                isAuthenticated,
                setIsAuthenticated,
                token,
                setToken,
                user,
                setUser,
                isAdmin,
                setIsAdmin,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
