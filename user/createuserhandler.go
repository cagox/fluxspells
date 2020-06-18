package user

import (
  "net/http"
  "html/template"
  
  )
  
  
  
  
  func createGameHandler(w http.ResponseWriter, r *http.Request) {
  //TODO: Add Session Bits
  
  if (r.Method == "POST") {
    //Create User
    r.ParseForm()
    newUserForm := CreateUserForm{}
    newUserForm.Email = r.FormValue("email")
    newUserForm.Password = r.FormValue("password")
    password2 := r.FormValue("password2")
    //Verify that password == password2
    
    //Verify that email is an email address
    
    //Verify that email is not already in the database
    
    //Create newUser from the form.
    newUser := CreateUserFromForm(newUserForm)
    
    //Check for any problems with newUser
    
    //Insert newUser into the database.
    InsertUser(newUser)
    
    //TODO: Once sessions are set up, add appropriate success message and setup session data.
    
    //Redirect to root
    http.Redirect(w, r, "/", http.StatusSeeOther)
    return
  }
  
    //Either Method != POST or there was an error creating the user.
    //Load the template.
    
  //Setup template  
  t := template.New("base.html")
  t, err := t.ParseFiles(config.Config.TemplateRoot+"/base/base.html", config.Config.TemplateRoot+"/base/index.html")
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
