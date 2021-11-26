import React, {useContext, useEffect} from 'react';
import AppContext from './AppContext.js';

function PageHeader(props) {
    const context = useContext(AppContext);

    useEffect(() => {document.title = context.headerTitle;}, [context.headerTitle]);

    return(

            <div className="page-header title-text">
                <h1>{context.headerTitle}</h1>
            </div>

            );

}

export default PageHeader;
