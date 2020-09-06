package schoolhandlers

import (
	"github.com/cagox/fluxspells/common/config"
	"github.com/cagox/fluxspells/common/session"
)

//Routes sets up the routes for this package.
func Routes() {
	config.Config.Router.HandleFunc("/school/{slug}/", schoolHandler)
	config.Config.Router.HandleFunc("/addschool/", session.MustBeAdmin(createSchoolHandler))
}
