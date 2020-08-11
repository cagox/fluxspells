package user

import (
	"fmt"

	"github.com/cagox/fluxspells/config"
	"github.com/cagox/fluxspells/crypto"

	"github.com/globalsign/mgo/bson"
)

//GetUsers returns a list of all the users in the database.
func GetUsers() []User {
	var users []User
	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()

	collection := mongoSession.DB(config.Config.DatabaseName).C("users")

	err := collection.Find(nil).Sort("-timestamp").All(&users)
	if err != nil {
		fmt.Println(err) //TODO: Add proper error handling.
	}

	return users
}

//AreThereAnyUsers checks to see if the database has any users or not.
func AreThereAnyUsers() bool {

	config.Config.Logger.Println("Attempting to load Mongo session.")
	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()
	config.Config.Logger.Println("Attempting to get user list.")
	users := mongoSession.DB(config.Config.DatabaseName).C("users")
	config.Config.Logger.Println("Attempting to check user count.")
	count, err := users.Count()
	if err != nil {
		//What the fuck?
		//TODO Add error handling
	}
	if count == 0 {
		return false
	}
	return true
}

//GetUserByEmail grabs a user object from the database based on the email address.
func GetUserByEmail(email string) *User {
	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()
	users := mongoSession.DB(config.Config.DatabaseName).C("users")

	var user *User
	err := users.Find(bson.M{"email": email}).One(&user)
	if err != nil {
		//TODO Error handling
	}
	return user
}

//SetPassword sets the password on the user object
func (user *User) SetPassword(password string) {
	user.PasswordHash = crypto.HashPassword(password)
}

//Authenticate allows the login method to make sure we have the right person.
func (user *User) Authenticate(password string) bool {
	return crypto.ComparePassword(password, user.PasswordHash)
}

//CreateUserFromForm creates a new user object from the data provided via a CreateUserForm object.
func CreateUserFromForm(newUser CreateUserForm) *User {
	user := &User{Email: newUser.Email, PasswordHash: crypto.HashPassword(newUser.Password)}
	return user
}

//IsEmailUnique lets you verify if a user exists in the database already. False means they are there.ss
func IsEmailUnique(email string) bool {
	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()
	users := mongoSession.DB(config.Config.DatabaseName).C("users")

	count, err := users.Find(bson.M{"email": email}).Count()
	if err != nil {
		fmt.Println(err) //TODO: Proper Error HAndling.
	}

	if count > 0 {
		return false
	}
	return true
}

//InsertUser adds the user to the database.
func InsertUser(user *User) error {
	//TODO: Verify uniquness and add error handling.
	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()
	users := mongoSession.DB(config.Config.DatabaseName).C("users")
	err := users.Insert(&user)
	if err != nil {
		return err
	}
	return nil
}
