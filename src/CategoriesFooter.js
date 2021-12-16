import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from './AppContext';
import {apiroot} from './Config';
import editIcon from './img/toolPencil.png';


export function CategoryURL(props){
    const context = useContext(AppContext);
    let new_title = props.name + " Spells";
    const clickHandler = () => {context.setPage("categoryView"); context.setSpellCategory(props.category_id); context.setSchool("all"); context.setHeaderTitle(new_title);}

    return (<button className="link" key={props.category_id} onClick={clickHandler}>{props.name}</button>);
}


function EditCategoriesButton(){
    const context = useContext(AppContext);
    if(context.isAuthenticated !== true) {
        return(<span>&nbsp;</span>);
    }

    return(
        <button className="link"><img className="buttonimg icon" src={editIcon} alt={"Edit Categories"} /></button>
    );
}





function CategoriesFooter(){
    const [categories, setCategories] = useState(null)



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
                <EditCategoriesButton />
                <span>No Categories Found</span>
            </div>
        );

    }

    return(
        <div className="navbar navbar-bottom">
            <EditCategoriesButton />
            {categories.map((item)=><CategoryURL key={item.category_id} category_id={item.category_id} name={item.name} />)}
        </div>
    );
}



export default CategoriesFooter;