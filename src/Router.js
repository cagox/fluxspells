import React from 'react';
import {useRoutes} from 'hookrouter';
import App from "./App";

// TODO: Changing to a newer tutorial. https://blog.logrocket.com/how-react-hooks-can-replace-react-router/

const routes = {
    "/": () => <App page="indexPage" school="all" spell="none" spellCategory="all" />,
    "/spells/:id": ({id}) => <App page="spellView" spell={id} />,
    "/categories/:id": ({id}) => <App page="categoryView" spellCategory={id} school="all" />,
    "/schools/:id": ({id}) => <App page="schoolView" spellCategory="all" school={id} />,
    "/login": () => <App page="loginView" school="all" spellCategory="all" />,
    "/logout": () => <App page="logout" school="all" spellCategory="all" />,
    "/spell/new": () => <App page="newSpell"/>,
};


function Router() {
    const routeResult = useRoutes(routes);

    return(routeResult);
}



export default Router;