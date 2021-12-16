import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from './AppContext.js';
import {A} from 'hookrouter';
//import ky from 'ky';
import {apiroot} from './Config';
import editIcon from './img/toolPencil.png';
//

export function SchoolURL(props){
    return(<A href={"/schools/"+props.school_id}>{props.name}</A>)
}

function EditSchoolsButton(){
    const context = useContext(AppContext);
    if(context.isAuthenticated !== true) {
        return(<span>&nbsp;</span>);
    }

    return(
        <button className="link"><img className="buttonimg icon" src={editIcon} alt={"Edit Schools"} /></button>
    );
}


function SchoolsHeader(props){
    const [schools, setSchools] = useState(null)

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
                <EditSchoolsButton />
                <span>No Schools Found</span>
            </div>
        );

    }

    return(
        <div className="navbar navbar-top">
            <EditSchoolsButton />
            <a href="/">Top</a>
            {schools.map((item)=><SchoolURL key={item.school_id} school_id={item.school_id} name={item.name} />)}
        </div>
    );
}



export default SchoolsHeader;