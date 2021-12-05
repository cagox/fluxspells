import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from './AppContext.js';
import {apiroot} from './Config';
import editIcon from './img/toolPencil.png';
import {SchoolURL} from "./SchoolsHeader";
import {CategoryURL} from "./CategoriesFooter";



function SpellView() {
    const context = useContext(AppContext)
    const [spell, setSpell] = useState("")

    useEffect(() => {
        let spellURI = apiroot+'spells/'+context.spell;
        console.log("SpellURI: "+spellURI);

        fetch(spellURI, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setSpell(data);
            })

},[context.spell]);


    console.log("Spell: "+spell)

    if (spell === "") {
        return(
                <div>The spell is loading</div>
             );
    }


    return(
        <div className="container spell-box">
            <div className="row spell-field">
                <div className="col">Cost: {spell.cost}</div>
                <div className="col">Difficulty: {spell.difficulty}</div>
                <div className="col">Range: {spell.spellrange}</div>
            </div>
            <div className="row spell-field">
                <div className="col">Prerequisites: {spell.prerequisites}</div>
                <div className="col">Ability Score: {spell.display_score}</div>
            </div>

                        <div className="row spell-field">
                            <div className="col-sm-auto">Schools: {spell.schools.map((school) => <SchoolURL name={school.name} school_id={school.school_id} />)}</div>
                        </div>

                        <div className="row spell-field">
                            <div className="col-sm-auto">Categories: {spell.categories.map((category) => <CategoryURL name={category.name} category_id={category.category_id} />)}</div>
                        </div>

                        <div className="row spell-field">
                            <div className="col-sm-auto">Summary: {spell.summary}</div>
                        </div>
                        <div className="row spell-field">
                            <div className="col">Description:</div>
                        </div>
                        <div className="row spell-field">
                            <div className="col">{spell.description}</div>
                        </div>
                    </div>
                    );
}

export default SpellView;