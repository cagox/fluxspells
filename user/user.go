package user

import (
	"encoding/gob"
  "time"

	"github.com/globalsign/mgo/bson"
)

//User is meant to hold user related information in the Database.
type User struct {
    ID            bson.ObjectId `bson:"_id,omitempty"`
    Email         string
    PasswordHash  string
    Timestamp     time.Time
    LastUpdated   time.Time
}

//CreateUserForm is a struct to facilitate creating user objects.
type CreateUserForm struct {
    Email     string
    Password  string
}


func init() {
	gob.Register(User{})
}
