package database

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/cagox/fluxspells/common/config"
)

//DialMongoSession starts the main mongo session.
func DialMongoSession() {
	credential := options.Credential{
		AuthMechanism: "SCRAM-SHA-1",
		Username:      config.Config.MongoUserName,
		Password:      config.Config.MongoPassword,
		AuthSource:    config.Config.DatabaseName,
	}

	clientOpts := options.Client().ApplyURI("mongodb://localhost:27017").SetAuth(credential)

	client, err := mongo.Connect(config.Config.MongoContext, clientOpts)
	//client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}

	config.Config.MongoClient = client
}

func buildContext() context.Context {
	return context.TODO()
}

func init() {
	config.Config.MongoContext = buildContext()

}
