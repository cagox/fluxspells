import React, {useContext, useEffect} from "react";
import history from 'browser-history';

import AppContext from "./AppContext";

// TODO: Changing to a newer tutorial. https://blog.logrocket.com/how-react-hooks-can-replace-react-router/

function Router({children}) {
    const context = useContext(AppContext)


    useEffect( () =>{

    }, [context.url]);


    return(
        <span>{children}</span>
    );


}