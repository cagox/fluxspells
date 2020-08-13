package userhandlers

import (
	"html/template"
	"net/http"

	"github.com/cagox/fluxspells/config"
	"github.com/cagox/fluxspells/session"
	"github.com/cagox/fluxspells/user"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {
	//TODO: Add Session Bits
	thisSession := session.GetSession(w, r)
	sessionData := session.GetSessionData(thisSession)

	if r.Method == "POST" {
		r.ParseForm()

		//If the email address is unique, then the user does not exist.
		if user.IsEmailUnique(r.FormValue("email")) {
			sessionData.Authenticated = false
			sessionData.AddFlash("error", "Email or Password did not match.")
			thisSession.Values["sessiondata"] = sessionData
			thisSession.Save(r, w)
			http.Redirect(w, r, "/login/", http.StatusSeeOther)
			return
		}

		newUser := user.GetUserByEmail(r.FormValue("email"))

		if newUser.Authenticate(r.FormValue("password")) {
			sessionData.AddFlash("success", "We are logging you in!")

			sessionData.Authenticated = true
			sessionData.Email = newUser.Email
			thisSession.Values["sessiondata"] = sessionData
			thisSession.Save(r, w)
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}
		sessionData.Authenticated = false
		sessionData.AddFlash("error", "Email or Password did not match.")
		thisSession.Values["sessiondata"] = sessionData
		thisSession.Save(r, w)

	}

	t := template.New("base.html")
	t, err := t.ParseFiles(config.Config.TemplateRoot+"/base/base.html", config.Config.TemplateRoot+"/user/login.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//Check if they are authenticaded and return them to the front page.
	if sessionData.Authenticated {
		config.Config.Logger.Println("info: User is already logged in.")
		sessionData.AddFlash("info", "User is already logged in.")
		thisSession.Values["sessiondata"] = sessionData
		thisSession.Save(r, w)
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	t.Execute(w, nil) //TODO: Update this eventually to deal more gracefully with errors.
	return

}
