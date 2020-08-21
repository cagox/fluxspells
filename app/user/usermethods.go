package user

import (
	"fmt"
	"log"

	"github.com/cagox/fluxspells/common/config"
	"github.com/cagox/fluxspells/common/crypto"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

//GetUsers returns a list of all the users in the database.
func GetUsers() []User {
	fmt.Println("usermethods.go GetUsers()")
	var users []User

	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("users")

	cursor, err := collection.Find(config.Config.MongoContext, bson.D{})
	if err != nil {
		config.Config.Logger.Println(err) //TODO: Add proper error handling.
	}

	for cursor.Next(config.Config.MongoContext) {
		result := User{}
		err := cursor.Decode(result)
		if err != nil {
			config.Config.Logger.Println(err)
		}

		users = append(users, result)

	}

	return users
}

//AreThereAnyUsers checks to see if the database has any users or not.
func AreThereAnyUsers() bool {
	fmt.Println("usermethods.go AreThereAnyUsers()")
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("users")
	count, err := collection.CountDocuments(config.Config.MongoContext, bson.D{})

	if err != nil {
		config.Config.Logger.Println(err)
	}

	if count == 0 {
		return false
	}
	return true
}

//GetUserByEmail grabs a user object from the database based on the email address.
func GetUserByEmail(email string) *User {
	fmt.Println("usermethods.go GetUserByEmail()")
	fmt.Println("email: " + email)
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("users")

	var user *User
	user = new(User)
	//opts := options.FindOne().SetSort(bson.D{})
	err := collection.FindOne(config.Config.MongoContext, bson.D{{"email", email}}).Decode(user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil
		}
		log.Fatal(err)
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
	fmt.Println("usermethods.go IsEmailUnique()")
	user := GetUserByEmail(email)

	if user != nil {
		return false
	}
	return true
}

//InsertUser adds the user to the database.
func InsertUser(user *User) error {
	fmt.Println("usermethods.go InsertUser()")
	//TODO: Verify uniquness and add error handling.
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("users")

	_, err := collection.InsertOne(config.Config.MongoContext, user)
	if err != nil {
		return err
	}
	return nil
}
