import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from './AppContext.js';
import {apiroot} from './Config';
import editIcon from './img/toolPencil.png';


export function CategoryURL(props){
    const context = useContext(AppContext);
    let new_title = props.name + " Spells";
    const clickhandler = () => {context.setPage("categoryView"); context.setSpellCategory(props.category_id); context.setSchool("all"); context.setHeaderTitle(new_title);}

    return (<button className="link" key={props.category_id} onClick={clickhandler}>{props.name}</button>);
}


function CategoriesFooter(){
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
                <button className="link"><img className="buttonimg icon" alt="Add Schools" src={editIcon} /></button>
                <span>No Categories Found</span>
            </div>
        );

    }

    return(
        <div className="navbar navbar-bottom">
            <button className="link"><img className="buttonimg icon" alt="Add Schools" src={editIcon} /></button>
            {categories.map((item)=><CategoryURL key={item.category_id} category_id={item.category_id} name={item.name} />)}
        </div>
    );
}



export default CategoriesFooter;