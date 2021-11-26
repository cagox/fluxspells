import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from './AppContext.js';
import {apiroot} from './Config';
import editIcon from './img/toolPencil.png';



function SpellView() {
    const context = useContext(AppContext)
    const [spell, setSpell] = useState("")
    const [abilityScore, setAbilityScore] = useState("")


    useEffect(() => {
        let spellURI = apiroot+'spells/'+context.spell;
        console.log("SpellURI: "+spellURI);

        fetch(spellURI, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setSpell(data);
                console.log("Data: "+data)
                fetch(apiroot+'abilityscores/'+data.ability_score_id, {
                    method: 'GET'
                }).then(response => response.json()).then(data2=>{setAbilityScore(data2); console.log("Just set data.")})
            })


    },[context.spell]);


    console.log("Spell: "+spell)


    return(
        <div className="container spell-box">
            <div className="row">
                <div className="col">Cost: </div><div className="col">{spell.cost}</div>
                <div className="col">Difficulty: </div><div className="col">{spell.difficulty}</div>
                <div className="col">Range: </div><div className="col">{spell.spellrange}</div>
            </div>
            <div className="row">
                <div className="col">Prerequisites:</div><div className="col">{spell.prerequisites}</div>
                <div className="col">Ability Score: </div><div className="col">{abilityScore.name}</div>
            </div>

            <div className="row">
                <div className="col-sm-auto">Schools:</div><div className="col">{spell.schools.map((item) => <span>{item.name}</span>)}</div>
            </div>

            <div className="row">
                <div className="col-sm-auto">Categories:</div><div className="col">{spell.categories.map((item) => <span>{item.name}</span>)}</div>
            </div>

            <div className="row">
                <div className="col-sm-auto">Summary:</div><div className="col-sm-auto">{spell.summary}</div>
            </div>
            <div className="row">
                <div className="col-sm-auto">Description:</div>
            </div>
            <div className="row">
                <div className="col-sm-auto">{spell.description}</div>
            </div>
        </div>
    );
}

export default SpellView;