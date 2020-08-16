package database

import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/cagox/fluxspells/common/config"
)

//DialMongoSession starts the main mongo session.
func DialMongoSession() {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		//
	}

	config.Config.MongoClient = client
}
