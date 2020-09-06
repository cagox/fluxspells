package schoolhandlers

import (
	"html/template"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/cagox/fluxspells/app/contexts"
	"github.com/cagox/fluxspells/app/spellbook/schools"
	"github.com/cagox/fluxspells/common/config"
	"github.com/cagox/fluxspells/common/session"
)

func schoolHandler(w http.ResponseWriter, r *http.Request) {
	thisSession := session.GetSession(w, r)
	sessionData := session.GetSessionData(thisSession)

	vars := mux.Vars(r)
	slug := vars["slug"]
	school := schools.GetSchoolBySlug(slug)

	if school != nil {
		var pageData contexts.SchoolPage
		pageData.SetupPage(sessionData)
		pageData.SetupSchool(*school)
		//pageData.SetupSpells()

		t := template.New("base.html")
		t, err := t.ParseFiles(config.Config.TemplateRoot+"/base/base.html", config.Config.TemplateRoot+"/spellbook/schools/viewschool.html")
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

	sessionData.AddFlash("error", "no such school")
	thisSession.Values["sessiondata"] = sessionData
	thisSession.Save(r, w)
	http.Redirect(w, r, "/", http.StatusSeeOther)
	return
}
