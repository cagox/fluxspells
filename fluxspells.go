package main

import (
	"fmt"

	"github.com/cagox/fluxspells/config"
)

func main() {
	fmt.Println("Hello World!")
	fmt.Println(config.Config.StaticPath)
}

//This is just a stub to kick things off.
