import React, {useContext, useEffect} from 'react';
import AppContext from './AppContext.js';


function PageFooter(){

    return(
        <div className="container footer">
            <div className="navbar">
                <a href="https://reactjs.org/">Powered By React</a>
                <a href="https://go.dev/">Powered by Go</a>
                <a href="https://github.com/cagox">Created by Cagox Media</a>
            </div>
        </div>
    );
}

export default PageFooter;