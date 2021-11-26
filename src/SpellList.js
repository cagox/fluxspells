import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from './AppContext.js'
import {apiroot} from './Config';

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
        fetch(apiroot+'spells', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setSpells(data);
            });
    }, [context.school,context.apiroot]);


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

    if(context.school !== "all") {
        return(
          <div>No schools?</div>
        );
    }

    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className="spells-th">Spell Name</th>
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