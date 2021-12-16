import React, {useContext, useEffect, useState} from 'react';
import AppContext from './AppContext';


function PageHeader(props) {
    const context = useContext(AppContext);
    const [buttonLabel, setButtonLabel] = useState("Button");

    const logoutHandler = () => {context.setIsAuthenticated(false); localStorage.setItem("authenticated", false); context.setToken(null); localStorage.setItem("token", null); localStorage.setItem("is_admin", false); context.setPage("indexPage"); context.setSchool("all"); context.setSpellCategory("all")};
    const loginHandler = () => {context.setPage("loginView"); context.setSchool("all"); context.setSpellCategory("all")};

    useEffect(() => {
        document.title = context.headerTitle;

        if (context.isAuthenticated === true) {
            setButtonLabel("Logout");
        } else {
            setButtonLabel("Login");
        }

        console.log("Token: "+context.token);
        console.log("Authenticated: "+context.isAuthenticated)
        console.log("URL: "+context.url)

        }, [context.headerTitle,context.isAuthenticated, context.token]);


    if(context.isAuthenticated === true) {
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
