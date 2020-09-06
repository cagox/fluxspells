package contexts

import (
	"github.com/cagox/fluxspells/common/session"
)

//CreateSchoolPage is the context for the School Creation handler.
type CreateSchoolPage struct {
	session.BasePageData
	CreationError bool
	Name          string
	Description   string
}
