import React, {useContext, useEffect, useState} from 'react';
import {A} from 'hookrouter';
import AppContext from './AppContext';


function PageHeader(props) {
    const context = useContext(AppContext);
    const [buttonLabel, setButtonLabel] = useState("Button");

    const logoutHandler = () => {context.setIsAuthenticated(false); localStorage.setItem("authenticated", "false"); context.setToken(null); localStorage.setItem("token", null); localStorage.setItem("is_admin", "false"); context.setPage("indexPage"); context.setSchool("all"); context.setSpellCategory("all")};
    const loginHandler = () => {context.setPage("loginView"); context.setSchool("all"); context.setSpellCategory("all")};

    useEffect(() => {
        document.title = context.headerTitle;

        if (context.isAuthenticated === true) {
            setButtonLabel("Logout");
        } else {
            setButtonLabel("Login");
        }

        }, [context.headerTitle,context.isAuthenticated, context.token]);


    if(context.isAuthenticated === true) {
        return(
            <span>
                <div className={"text-align-right"}><A href="/logout">Logout</A></div>
                <div className="page-header title-text">
                    <h1>{context.headerTitle}</h1>
                </div>
            </span>
        );
    }

    return(
            <span>
                <div className={"text-align-right"}><A href="/login">Login</A></div>
                <div className="page-header title-text">
                    <h1>{context.headerTitle}</h1>
                </div>
            </span>
            );

}


export default PageHeader;
