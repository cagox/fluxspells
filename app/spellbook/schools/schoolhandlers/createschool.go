package schoolhandlers

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/cagox/fluxspells/app/contexts"
	"github.com/cagox/fluxspells/app/spellbook/schools"
	"github.com/cagox/fluxspells/common/config"
	"github.com/cagox/fluxspells/common/session"
)

func createSchoolHandler(w http.ResponseWriter, r *http.Request) {

	thisSession := session.GetSession(w, r)
	sessionData := session.GetSessionData(thisSession)
	pageData := contexts.CreateSchoolPage{}
	pageData.BasicData(sessionData)
	pageData.Page = "CreateSchool"

	if r.Method == "POST" {
		form := schools.CreateSchoolForm{}
		form.Name = r.FormValue("name")
		form.Description = r.FormValue("description")

		school := schools.CreateSchoolFromForm(form)

		isUnique := schools.ValidateIsSlugUnique(school.Slug)
		if isUnique {
			err := schools.InsertNewSchool(school)
			if err != nil {
				fmt.Println(err.Error())
			} else {
				sessionData.AddFlash("success", "The "+school.Name+" school of magic was added.")
				thisSession.Values["sessiondata"] = sessionData
				thisSession.Save(r, w)
				http.Redirect(w, r, "/school/"+school.Slug+"/", http.StatusSeeOther)
				return
			}
		}
		if !isUnique {
			fmt.Println("Slug was not unique")
		}
		pageData.CreationError = true
		pageData.Name = form.Name
		pageData.Description = form.Description
	}

	t := template.New("base.html")
	t, err := t.ParseFiles(config.Config.TemplateRoot+"/base/base.html", config.Config.TemplateRoot+"/spellbook/schools/createschool.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = t.Execute(w, pageData)
	if err != nil {
		config.Config.Logger.Println(err.Error())
	}
	return

}
