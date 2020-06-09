package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/cagox/fluxspells/config"
	"github.com/cagox/fluxspells/routes"
)

func main() {
	fmt.Println("Hello World!")
	fmt.Println("Statics: " + config.Config.StaticPath)
	fmt.Println("Templates: " + config.Config.TemplateRoot)

	routes.Routes()

	log.Fatal(http.ListenAndServe("localhost:8080", config.Config.Router))
}

//This is just a stub to kick things off.
