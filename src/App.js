import React from 'react';
import PageHeader from './PageHeader.js';
import SchoolsHeader from './SchoolsHeader.js';
import PageBody from './PageBody.js';
import CategoriesFooter from './CategoriesFooter.js';
import PageFooter from './PageFooter.js';


function App(props) {
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