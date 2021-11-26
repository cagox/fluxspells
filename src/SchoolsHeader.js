import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from './AppContext.js';
//import ky from 'ky';
import {apiroot} from './Config';
import editIcon from './img/toolPencil.png';


export function SchoolURL(props){
    const context = useContext(AppContext);
    let new_title = "School of " + props.name;
    const clickhandler = () => {context.setPage("schoolView"); context.setSchool(props.school_id); context.setSpellCategory("all"); context.setHeaderTitle(new_title);}

    return (<button className="link" key={props.school_id} onClick={clickhandler}>{props.name}</button>);
}


function SchoolsHeader(props){
    const [schools, setSchools] = useState(null)

    //const requestURI = apiroot+"/schools/header"


    useEffect(()=> {
        fetch(apiroot+'schools/header', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setSchools(data);
            });
    }, [])




    if (schools === null) {
        return(
            <div className="navbar navbar-top">
                <button className="link"><img className="buttonimg icon" alt="Add Schools" src={editIcon} /></button>
                <span>No Schools Found</span>
            </div>
        );

    }

    return(
        <div className="navbar navbar-top">
            <button className="link"><img className="buttonimg icon" alt="Add Schools" src={editIcon} /></button>
            <a href="/">Top</a>
            {schools.map((item)=><SchoolURL key={item.school_id} school_id={item.school_id} name={item.name} />)}
        </div>
    );
}



export default SchoolsHeader;