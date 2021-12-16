import React, {useContext, useState, useEffect} from 'react';
import {A} from 'hookrouter';
import {AppContext} from './AppContext';
import {apiroot} from './Config';
import editIcon from './img/toolPencil.png';


export function CategoryURL(props){
    return(<A href={"/categories/"+props.category_id}>{props.name}</A>);
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