package userhandlers

import (
	"github.com/cagox/fluxspells/config"
	"github.com/cagox/fluxspells/session"
)

//Routes initializes the routes for the spellbook package.
func Routes() {
	config.Config.Router.HandleFunc("/createuser/", session.DatabaseMustBeEmpty(createUserHandler))
}
