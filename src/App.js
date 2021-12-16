import React, {useContext} from 'react';
import AppContext from "./AppContext";
import PageHeader from './PageHeader';
import SchoolsHeader from './SchoolsHeader';
import PageBody from './PageBody';
import CategoriesFooter from './CategoriesFooter';
import PageFooter from './PageFooter';


function App(props) {
    const context = useContext(AppContext)
    if(props.page) { context.setPage(props.page)}
    if(props.school) {context.setSchool(props.school)}
    if(props.spellCategory) {context.setSpellCategory(props.spellCategory)}
    if(props.spell) {context.setSpell(props.spell)}
    if(props.headerTitle) {context.setHeaderTitle(props.headerTitle)}

  return(
      <span>
          <div className="container">
              <PageHeader />
              <SchoolsHeader />
              <PageBody />
              <CategoriesFooter />
          </div>
        <PageFooter />
      </span>
  );
}



export default App;