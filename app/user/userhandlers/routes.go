package userhandlers

import (
	"github.com/cagox/fluxspells/common/config"
	"github.com/cagox/fluxspells/common/session"
)

//Routes initializes the routes for the spellbook package.
func Routes() {
	config.Config.Router.HandleFunc("/createuser/", session.DatabaseMustBeEmpty(createUserHandler))
	config.Config.Router.HandleFunc("/login/", loginHandler)
	config.Config.Router.HandleFunc("/logout/", logoutHandler)
}
