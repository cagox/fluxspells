import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from './AppContext.js';
//import ky from 'ky';
import {apiroot} from './Config';
import addIcon from './img/add.png';


export function CategoryURL(props){
    const context = useContext(AppContext);
    let new_title = props.name + " Spells";
    const clickhandler = () => {context.setPage("categoryView"); context.setCategory(props.category_id); context.setHeaderTitle(new_title); console.log("Clicked on "+props.name);}

    return (<button className="link" key={props.school_id} onClick={clickhandler}>{props.name}</button>);
}


function CategoryHeader(props){
    const [categories, setCategories] = useState(null)

    //const requestURI = apiroot+"/schools/header"


    useEffect(()=> {
        fetch(apiroot+'categories/header', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            });
    }, [])




    if (categories === null) {
        return(
            <div className="navbar navbar-bottom">
                <button className="link"><img className="buttonimg" alt="Add Schools" src={addIcon} height="25px" width="25px"/></button>
                <span>No Schools Found</span>
            </div>
        );

    }

    return(
        <div className="navbar navbar-bottom">
            <button className="link"><img className="buttonimg" alt="Add Schools" src={addIcon} height="25px" width="25px"/></button>
            {categories.map((item)=><CategoryURL key={item.school_id} school_id={item.school_id} name={item.name} />)}
        </div>
    );
}



export default CategoryHeader;