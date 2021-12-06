import React, {useContext, useEffect, useState} from 'react';
import AppContext from './AppContext.js';
//import {apiroot} from './Config.js';


function PageHeader(props) {
    const context = useContext(AppContext);
    const [buttonLabel, setButtonLabel] = useState("Button");

    const logoutHandler = () => {context.setIsAuthenticated(false); context.setToken(null); context.setPage("indexPage"); context.setSchool("all"); context.setSpellCategory("all")};
    const loginHandler = () => {context.setPage("loginView"); context.setSchool("all"); context.setSpellCategory("all")};

    useEffect(() => {
        document.title = context.headerTitle;

        if (context.isAuthenticated) {
            setButtonLabel("Logout");
        } else {
            setButtonLabel("Login");
        }

        }, [context.headerTitle,context.isAuthenticated]);


    if(context.isAuthenticated) {
        return(
            <span>
                <div className={"text-align-right"}><button onClick={logoutHandler} className={"link"}>{buttonLabel}</button></div>
                <div className="page-header title-text">
                    <h1>{context.headerTitle}</h1>
                </div>
            </span>
        );
    }

    return(
            <span>
                <div className={"text-align-right"}><button onClick={loginHandler} className={"link"}>{buttonLabel}</button></div>
                <div className="page-header title-text">
                    <h1>{context.headerTitle}</h1>
                </div>
            </span>
            );

}


export default PageHeader;
