import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from './AppContext.js'
import {apiroot} from './Config';
import addIcon from './img/add.png';
import {CategoryURL} from './CategoriesFooter';
import {SchoolURL} from "./SchoolsHeader";



function SpellURL(props) {
    const context = useContext(AppContext);
    let new_title = "Spell: " + props.name;

    const clickHandler = () => {context.setPage("spellView"); context.setSpell(props.spell_id); context.setHeaderTitle(new_title);}

    return(
        <button className="link" onClick={clickHandler}>{props.name}</button>
    );
}

function AddSpellButton(){
    const context = useContext(AppContext);
    if(context.isAuthenticated !== true) {
        return(<span>&nbsp;</span>);
    }

    const clickHandler = () => {context.setPage("newSpell"); context.setHeaderTitle("New Spell")};
    return(
        <button className="link" onClick={clickHandler}><img className="buttonimg icon" src={addIcon} alt={"Add a Spell"} /></button>
    );
}





function SpellList() {
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
                <AddSpellButton /> No Spells in this school.
            </div>
        );
    }

    if(spells.length === 0) {
        return(
            <div className="spell-grid">
                <AddSpellButton /> No Spells in this school.
            </div>
        );
    }


    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className="spells-th"><AddSpellButton /></th>
                    <th className="spells-th">Spell Name</th>
                    <th className="left-border-green spells-th">Schools</th>
                    <th className="left-border-green spells-th">Categories</th>
                    <th className="left-border-green spells-th">Summary</th>
                </tr>
            </thead>
            <tbody>
                {spells.map((item)=>
                    <tr>
                        <td>&nbsp;</td>
                        <td className="col-med-auto"><SpellURL spell_id={item.spell_id} name={item.name}/></td>
                        <td className={"left-border-green"}>{item.schools.map((school)=><SchoolURL name={school.name} school_id={school.school_id} />)}</td>
                        <td className={"left-border-green"}>{item.categories.map((category)=><CategoryURL name={category.name} category_id={category.category_id} />)}</td>
                        <td className={"left-border-green"}>{item.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

}


export default SpellList;