package schools

import (
	"github.com/cagox/fluxspells/common/session"
)

//SchoolPage is the context for pages dealing with a single specific school
type SchoolPage struct {
	session.BasePageData
	ThisSchool School
}

//SetupPage sets up the data for the session.
func (page *SchoolPage) SetupPage(session session.Data) {
	page.BasicData(session)
	page.Page = "School"
}
