import React, {useContext, useEffect, useState} from 'react';
import {navigate} from 'hookrouter';
import AppContext from './AppContext.js';
import {apiroot} from './Config.js';

/*
 *  First I will get a functional form working, then I will make it pretty
 *  after everything is working. Ultimately, the spell input form is less
 *  important than the various "view" forms.
 *
 */

function NewSpell() {
    //TODO: Verify authentication before showing the form.
    //This will only be important once I implement react-router routing.
    //I do plan to do that eventually, so people can link to specific spells.

    return(
        <NewSpellForm />
    );
}


function NewSpellForm() {
    const context = useContext(AppContext)
    const [spellName, setSpellName] = useState("")
    const [cost, setCost] = useState("-")
    const [difficulty,setDifficulty] = useState("Variable")
    const [spellRange, setSpellRange] = useState("Variable")
    const [prerequisites, setPrerequisites] = useState("none")
    const [abilityScore, setAbilityScore] = useState(8)
    const [abilityScores, setAbilityScores] = useState(null)
    const [abilityScoresLoaded, setAbilityScoresLoaded] = useState(false)
    const [summary, setSummary] = useState(" ")
    const [description, setDescription] = useState(" ")
    const [spellCategories, setSpellCategories] = useState();
    const [spellSchools, setSpellSchools] = useState();
    const [spellsLoaded, setSpellsLoaded] = useState(false)
    const [categoriesLoaded, setCategoriesLoaded] = useState(false)
    const [schoolSelected, setSchoolSelected] = useState({school_id: -1, name: " "})
    const [selectedSchoolList, setSelectedSchoolList] = useState([])
    const [categorySelected, setCategorySelected] = useState({category_id: -1, name: " "})
    const [selectedCategoriesList, setSelectedCategoriesList] = useState([])
    const [processSpell, setProcessSpell] = useState(false)

    context.setHeaderTitle("New Spell")

    useEffect(() => {

        if(processSpell === true) {
            let bodyData = JSON.stringify({token: context.token, body_spell: {name: spellName, cost: cost, difficulty: difficulty, spellrange: spellRange, ability_score_id: parseInt(abilityScore), summary: summary, description: description, schools: selectedSchoolList, categories: selectedCategoriesList}})

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                Authorization: context.token,
                body: bodyData
            }
            setProcessSpell(false)
            fetch(apiroot+'spell', requestOptions)
                .then(response=> response.json())
                .then(data => {
                    console.log("spell id: "+data.spell_id);
                    navigate("/spells/"+data.spell_id);
                    /*context.setSpell(data.spell_id); context.setSchool("all");
                    context.setSpellCategory("all");
                    context.setHeaderTitle("Spell: "+spellName);
                    context.setPage("spellView")*/})
        }//end processSpell

        fetch(apiroot+"schools/header", {method: "GET"})
            .then(response => response.json())
            .then(data => {setSpellSchools(data); setSpellsLoaded(true);});
        fetch(apiroot+"categories/header", {method: "GET"})
            .then(response => response.json())
            .then(data => {setSpellCategories(data); setCategoriesLoaded(true);});
        fetch(apiroot+"abilityscores", {method: "GET"})
            .then(response => response.json())
            .then(data => {setAbilityScores(data); setAbilityScoresLoaded(true)});
    },[context, processSpell]);



    const nameChangeHandler = (e) => {setSpellName(e.target.value);}
    const costChangeHandler = (e) => {setCost(e.target.value);}
    const difficultyChangeHandler = (e) => {setDifficulty(e.target.value);}
    const spellRangeChangeHandler = (e) => {setSpellRange(e.target.value);}
    const prerequisitesChangeHandler = (e) => {setPrerequisites(e.target.value);}
    const abilityScoreChangeHandler = (e) => {setAbilityScore(e.target.value);}
    const summaryChangeHandler = (e) => {setSummary(e.target.value);}
    const descriptionChangeHandler = (e) => {setDescription(e.target.value);}

    if(spellsLoaded !== true || categoriesLoaded !== true || abilityScoresLoaded !== true) {
        return(<div>Waiting for Data</div>);
    }

    const schoolSelectChangeHander = (e) => {
        let temp_id = parseInt(e.currentTarget.value);
        let temp_object = spellSchools.find((item) => {return item.school_id === temp_id})

        let selectedSchool = {
            school_id: temp_id,
            name: temp_object.name
        }
        setSchoolSelected(selectedSchool)
    };

    const categorySelectChangeHander = (e) => {
        let temp_id = parseInt(e.currentTarget.value);
        let temp_object = spellCategories.find((item) => {return item.category_id === temp_id})

        let selectedCategory= {
            category_id: temp_id,
            name: temp_object.name
        }
        setCategorySelected(selectedCategory)
    };

    const toggleSchoolButtonHandler = (e) => {
        e.preventDefault();
        if(schoolSelected.school_id !== -1) {
            let newArray = [...selectedSchoolList, schoolSelected]
            if(selectedSchoolList.includes(schoolSelected)) {
                newArray = newArray.filter(school => school.school_id !== schoolSelected.school_id) /*TODO: Figure out why it reads existing items, then removes them on the next try?*/
            }
            setSelectedSchoolList(newArray)
        }
    };

    const toggleCategoryButtonHandler = (e) => {
        e.preventDefault();
        if(categorySelected.category_id !== -1) {
            let newArray = [...selectedCategoriesList, categorySelected]
            if(selectedCategoriesList.includes(categorySelected)) {
                newArray = newArray.filter(spellCategory => spellCategory.category_id !== categorySelected.category_id) /*TODO: Figure out why it reads existing items, then removes them on the next try?*/
            }
            setSelectedCategoriesList(newArray)
        }
    };

    const submitSpellHandler = (e) => {
        e.preventDefault();
        // TODO: Possibly put validation code here.
        //console.log("This was clicked.")
        setProcessSpell(true)
    };


    return(
        <div className="spell-box">
            <form>
                <div className="row slight-padding">
                    <div className="col-auto"><label>Spell Name:&nbsp; <input type="text" name="name" value={spellName} onChange={nameChangeHandler} size={42} /></label></div>
                </div>
                <div className="row slight-padding">
                    <div className="col-auto"><label>Cost:&nbsp; <input type="text" name="cost" value={cost} onChange={costChangeHandler} /></label></div>
                    <div className="col-auto"><label>Difficulty:&nbsp; <input type="text" name="difficulty" value={difficulty} onChange={difficultyChangeHandler} /></label></div>
                    <div className="col-auto"><label>Range:&nbsp; <input type="text" name="spellrange" value={spellRange} onChange={spellRangeChangeHandler} /></label></div>
                </div>
                <div className="row slight-padding">
                    <div>{/*Schools*/}
                        <label>Schools</label>
                        <select name="schools" onChange={schoolSelectChangeHander}>
                            <option value={"-1"}></option>
                            {spellSchools.map((school)=><option value={school.school_id}>{school.name}</option>)}
                        </select>&nbsp;
                        <button value="Add" onClick={toggleSchoolButtonHandler}> Add/Remove</button>&nbsp;
                        {selectedSchoolList.map((item)=><button className="link">{item.name}</button>)}
                    </div>
                    <div>{/*Categories*/}
                        <label>Categories</label>
                        <select name="schools" onChange={categorySelectChangeHander}>
                            <option value={"-1"}></option>
                            {spellCategories.map((spellCategory)=><option value={spellCategory.category_id}>{spellCategory.name}</option>)}
                        </select>&nbsp;
                        <button value="Add" onClick={toggleCategoryButtonHandler}> Add/Remove</button>&nbsp;
                        {selectedCategoriesList.map((item)=><button className="link">{item.name}</button>)}
                    </div>

                </div>
                <div className="row slight-padding">
                    <div className="col-auto"><label>Prerequisites:&nbsp; <input type="text" name="prerequisites" size="32" value={prerequisites} onChange={prerequisitesChangeHandler} /></label></div>
                    <div className="col-auto">
                        <label>Ability Score:&nbsp;
                            <select name="ability_score" onChange={abilityScoreChangeHandler}>
                                <option value={"-1"}></option>
                                {abilityScores.map((item)=><option value={item.ability_score_id}>{item.name}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="row slight-padding">
                    <div className="col-auto"><label>Summary:&nbsp; <input type="text" name="summary" size="64" value={summary} onChange={summaryChangeHandler} /></label></div>
                </div>
                <div className="row slight-padding">
                    <div className="col-auto"><label>Description:&nbsp;</label></div>
                    <div className="col-auto"><textarea cols="80" rows="6" onChange={descriptionChangeHandler} value={description}></textarea></div>
                </div>
                <div>
                    <button value="Submit" onClick={submitSpellHandler}>Add Spell</button>
                </div>
            </form>
        </div>
    );
}




export default NewSpell;


