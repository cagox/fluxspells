import React, { createContext, useState } from "react";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
    const [page, setPage]               = useState("indexPage");
    const [school, setSchool]           = useState("all");
    const [spellCategory, setSpellCategory]  = useState("all");
    const [spell, setSpell]             = useState("none");
    const [headerTitle, setHeaderTitle] = useState("FluxRPG Spell List");
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("is_admin")))
    const [url, setUrl] = useState(window.location.pathname)

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
                url,
                setUrl,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
