package spellbook

import (
	"fmt"

	"github.com/cagox/fluxspells/config"
)

//Routes initializes the routes for the spellbook package.
func Routes() {
	fmt.Println("Setting up /")
	config.Config.Router.HandleFunc("/", indexHandler)
}
