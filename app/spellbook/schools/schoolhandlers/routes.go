package schoolhandlers

import (
	"github.com/cagox/fluxspells/common/config"
)

//Routes sets up the routes for this package.
func Routes() {
	config.Config.Router.HandleFunc("/school/{slug}/", schoolHandler)
}
