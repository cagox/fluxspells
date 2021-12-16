import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from './AppContext.js'
import {apiroot} from './Config';
import SpellList from "./SpellList";
import editIcon from './img/toolPencil.png'



function CategoryView() {
    const context = useContext(AppContext);
    const [spellCategory, setSpellCategory] = useState("");


    useEffect( () => {
        let categoryURI = apiroot+'categories/'+context.spellCategory;

        fetch(categoryURI, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setSpellCategory(data);
                context.setHeaderTitle(data.name+" Spells")
            });



        }, [context.spellCategory]);




    return(
        <span>
            <div className="description-box">
                <button className="link"><img src={editIcon} alt="Edit Category" className="buttonimg icon"/></button>
                {spellCategory.description}
            </div>
            <SpellList />
        </span>
    );

}


export default CategoryView;