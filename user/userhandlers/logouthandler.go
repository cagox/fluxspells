package userhandlers

import (
	"fmt"
	"net/http"

	"github.com/cagox/fluxspells/session"
)

//indexHandler just blanks the session data and returns to index.
//We don't actually care if the user was already authenticated.
func logoutHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("indexHandler was called.")

	thisSession := session.GetSession(w, r)
	sessionData := session.NewSessionData()
	sessionData.AddFlash("success", "Logged Out")
	thisSession.Values["sessiondata"] = sessionData
	thisSession.Save(r, w)

	http.Redirect(w, r, "/", http.StatusSeeOther)
	return
}
