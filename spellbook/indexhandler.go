package spellbook

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/cagox/fluxspells/config"
)

//The current version of the template still has cruft from the project it was borrowed from.
//This struct will provide the info that it thinks it wants.
type dummyContext struct {
	Page string
}

func indexHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("indexHandler was called.")

	//For now we are just going to load a templated file.
	t := template.New("base.html")
	t, err := t.ParseFiles(config.Config.TemplateRoot+"/base/base.html", config.Config.TemplateRoot+"/base/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fakeContext := dummyContext{}
	fakeContext.Page = "Index"

	t.Execute(w, fakeContext)
	return
}
