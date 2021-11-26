import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from './AppContext.js'
import {apiroot} from './Config';
import editIcon from "./img/toolPencil.png";

function SpellURL(props) {
    const context = useContext(AppContext);
    let new_title = "Spell: " + props.name;

    const clickHandler = () => {context.setPage("spellView"); context.setSpell(props.spell_id); context.setHeaderTitle(new_title);}

    return(
        <button className="link" onClick={clickHandler}>{props.name}</button>
    );
}


function SpellList(props) {
    const context = useContext(AppContext)
    const [spells, setSpells] = useState(null);


    useEffect( () => {
        let spellListURI = apiroot+'spells'

        if (context.school !== "all") {
            spellListURI = apiroot+'schools/'+context.school+'/spells'
        }

        if(context.spellCategory !== "all") {
            spellListURI = apiroot+'categories/'+context.spellCategory+'/spells'
        }

        fetch(spellListURI, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setSpells(data);
            });
    }, [context.school,context.spellCategory]);


    if(spells === null) {
        return(
            <div className="spell-grid">
                No Spells in this school.
            </div>
        );
    }

    if(spells.length === 0) {
        return(
            <div className="spell-grid">
                No Spells in this school.
            </div>
        );
    }


    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className="spells-th">
                        <button className="link"><img className="buttonimg icon" alt="Add Schools" src={editIcon} /></button>
                        Spell Name
                    </th>
                    <th className="left-border-green spells-th">Schools</th>
                    <th className="left-border-green spells-th">Categories</th>
                    <th className="left-border-green spells-th">Summary</th>
                </tr>
            </thead>
            <tbody>
                {spells.map((item)=>
                    <tr>
                        <td><SpellURL spell_id={item.spell_id} name={item.name}/></td>
                        <td>{item.schools.map((school)=><span>{school.name}</span>)}</td>
                        <td>{item.categories.map((category)=><span>{category.name}</span>)}</td>
                        <td>{item.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

}


export default SpellList;