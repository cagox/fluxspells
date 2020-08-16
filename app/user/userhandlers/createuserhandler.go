package userhandlers

import (
	"html/template"
	"net/http"

	"github.com/cagox/fluxspells/app/user"
	"github.com/cagox/fluxspells/common/config"
	"github.com/cagox/fluxspells/common/session"
)

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	//TODO: Add Session Bits
	thisSession := session.GetSession(w, r)
	sessionData := session.GetSessionData(thisSession)

	if r.Method == "POST" {
		//Create User
		r.ParseForm()
		newUserForm := user.CreateUserForm{}
		newUserForm.Email = r.FormValue("email")
		newUserForm.Password = r.FormValue("password")
		//password2 := r.FormValue("password2")
		//Verify that password == password2

		//Verify that email is an email address

		//Verify that email is not already in the database

		//Create newUser from the form.
		newUser := user.CreateUserFromForm(newUserForm)

		//Check for any problems with newUser

		//Insert newUser into the database.

		//TODO: Change this if we go multi-user
		newUser.IsAdmin = true

		user.InsertUser(newUser)

		//TODO: Once sessions are set up, add appropriate success message and setup session data.
		sessionData.AddFlash("success", "User "+newUser.Email+" successfully created.")
		thisSession.Values["sessiondata"] = sessionData
		thisSession.Save(r, w)
		//Redirect to root
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	//Either Method != POST or there was an error creating the user.
	//Load the template.

	//Setup template
	config.Config.Logger.Println("Loading the Create User Form")
	t := template.New("base.html")
	t, err := t.ParseFiles(config.Config.TemplateRoot+"/base/base.html", config.Config.TemplateRoot+"/user/createuser.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//TODO: Handle Session code.

	//Execute Template.
	//TODO: Update when Session stuff is more in place.
	t.Execute(w, nil)
	return

}

//TODO: Eventually set this page up to hanlde flash messages properly
