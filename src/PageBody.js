import React, {useContext} from 'react';
import {AppContext} from './AppContext.js';
import SpellList from './SpellList.js';
import SchoolView from "./SchoolView";
import CategoryView from "./CategoryView";
import SpellView from "./SpellView";
import LoginView from "./LoginView";
import NewSpell from "./NewSpell";

function PageBody(props){
    const context = useContext(AppContext);
    if (context.page === "indexPage" ) {
        return(
            <SpellList />
        );
    }

    if (context.page === "schoolView") {
        return (<SchoolView />);
    }

    if (context.page === "categoryView") {
        return (<CategoryView />);
    }

    if(context.page === "spellView") {
        return (<SpellView />);
    }

    if(context.page === "loginView") {
        return(<LoginView />)
    }

    if(context.page === "newSpell"){
        return(<NewSpell />)
    }





    /* Default */
    return(
        <div>If you are seeing this, the page value was not set properly if you see this, pleace contact <a href="mailto:fluxrpg@cagox.net">FluxRPG@cagox.net</a>.</div>
    );


}


export default PageBody