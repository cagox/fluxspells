package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/cagox/fluxspells/config"
	"github.com/cagox/fluxspells/database"
	"github.com/cagox/fluxspells/routes"
)

func main() {
	//Set up logging
	f, err := os.OpenFile("text.log",
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
	}
	defer f.Close()

	config.Config.Logger = log.New(f, "prefix", log.LstdFlags)

	database.DialMongoSession()
	defer config.Config.MongoSession.Close()

	fmt.Println("Hello World!")
	fmt.Println("Statics: " + config.Config.StaticPath)
	fmt.Println("Templates: " + config.Config.TemplateRoot)

	routes.Routes()

	log.Fatal(http.ListenAndServe("localhost:8080", config.Config.Router))
}

//This is just a stub to kick things off.
