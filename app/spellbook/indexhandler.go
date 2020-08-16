package spellbook

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/cagox/fluxspells/common/config"
	"github.com/cagox/fluxspells/common/session"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("indexHandler was called.")

	thisSession := session.GetSession(w, r)
	sessionData := session.GetSessionData(thisSession)

	//For now we are just going to load a templated file.
	t := template.New("base.html")
	t, err := t.ParseFiles(config.Config.TemplateRoot+"/base/base.html", config.Config.TemplateRoot+"/base/index.html")
	//t, err := t.ParseFiles(config.Config.TemplateRoot + "/base/base.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var pageData session.BasePageData
	pageData.BasicData(sessionData)
	pageData.Page = "Index"

	err = t.Execute(w, pageData)
	if err != nil {
		config.Config.Logger.Println(err.Error())
	}
	return
}
