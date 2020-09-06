package contexts

import (
	"github.com/cagox/fluxspells/app/spellbook/schools"
	"github.com/cagox/fluxspells/app/spellbook/spells"
	"github.com/cagox/fluxspells/common/session"
)

//SchoolPage is the context for pages dealing with a single specific school
type SchoolPage struct {
	session.BasePageData
	ThisSchool schools.School
	Spells     []spells.Spell
}

//SetupSchool accepts a school as an argument, and assigns it to the This School variable before setting up the spell list.
func (page *SchoolPage) SetupSchool(school schools.School) {
	page.ThisSchool = school
	page.SetupSpells()
}

//SetupPage sets up the data for the session.
func (page *SchoolPage) SetupPage(session session.Data) {
	page.BasicData(session)
	page.Page = "School"
}

//SetupSpells assigns the schools spells to Spells.
func (page *SchoolPage) SetupSpells() {
	page.Spells = spells.GetSpellsBySchool(page.ThisSchool.Slug)
}
