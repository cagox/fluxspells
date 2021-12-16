import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from './AppContext.js'
import {apiroot} from './Config';
import SpellList from "./SpellList";
import editIcon from "./img/toolPencil.png";




function SchoolView(props) {
    const context = useContext(AppContext)
    const [school, setSchool] = useState("")

    useEffect( () => {
        let schoolURI = apiroot+'schools/'+context.school;

        fetch(schoolURI, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setSchool(data);
                context.setHeaderTitle("School of "+data.name)
            });

        }, [context.school]);

    return(
      <span>
          <div className="description-box">
              <button className="link"><img src={editIcon} alt="Edit School" className="buttonimg icon" /></button>
              {school.description}
          </div>
          <SpellList />
      </span>
    );

}

export default SchoolView;