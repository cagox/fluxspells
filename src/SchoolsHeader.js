import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from './AppContext.js';
//import ky from 'ky';
import {apiroot} from './Config';
import addIcon from './img/add.png';


export function SchoolURL(props){
    const context = useContext(AppContext);
    let new_title = "School of " + props.name;
    const clickhandler = () => {context.setPage("schoolView"); context.setSchool(props.school_id); context.setHeaderTitle(new_title); console.log("Clicked on "+props.name);}

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
                <button className="link"><img className="buttonimg" alt="Add Schools" src={addIcon} height="25px" width="25px"/></button>
                <span>No Schools Found</span>
            </div>
        );

    }

    return(
        <div className="navbar navbar-top">
            <button className="link"><img className="buttonimg" alt="Add Schools" src={addIcon} height="25px" width="25px"/></button>
            <a href="/">Top</a>
            {schools.map((item)=><SchoolURL key={item.school_id} school_id={item.school_id} name={item.name} />)}
        </div>
    );
}



export default SchoolsHeader;