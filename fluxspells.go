package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/cagox/fluxspells/app/database"
	"github.com/cagox/fluxspells/app/routes"
	"github.com/cagox/fluxspells/common/config"
)

func main() {
	//Set up logging
	f, err := os.OpenFile("fluxspells.log",
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
	}
	defer f.Close()

	config.Config.Logger = log.New(f, "flux: ", log.LstdFlags)

	database.DialMongoSession()
	defer config.Config.MongoSession.Close()

	fmt.Println("Hello World!")
	fmt.Println("Statics: " + config.Config.StaticPath)
	fmt.Println("Templates: " + config.Config.TemplateRoot)

	routes.Routes()

	log.Fatal(http.ListenAndServe("localhost:8080", config.Config.Router))
}

//This is just a stub to kick things off.
