package routes

import (
	"net/http"

	"github.com/cagox/fluxspells/config"
	"github.com/cagox/fluxspells/spellbook"
)

//Routes calls the Routes() functions in all of the packages.
func Routes() {
	specialRoutes()
	spellbook.Routes()
}

func specialRoutes() {
	staticDir := "/static/"
	//This will route to /static/, and should keep things going during dev.
	config.Config.Router.PathPrefix(staticDir).Handler(http.StripPrefix(staticDir, http.FileServer(http.Dir(config.Config.StaticPath))))
}
