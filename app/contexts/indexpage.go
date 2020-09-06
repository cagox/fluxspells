package contexts

import (
	"github.com/cagox/fluxspells/app/spellbook/schools"
	"github.com/cagox/fluxspells/common/session"
)

//IndexPage is the context for the Index Page.
type IndexPage struct {
	session.BasePageData
	Schools []schools.School
}

//SetupPage sets up the data for the session.
func (page *IndexPage) SetupPage(session session.Data) {
	page.BasicData(session)
	page.Schools = schools.GetSchools()
	page.Page = "Index"

}
