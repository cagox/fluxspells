package database

import (
	"github.com/cagox/fluxspells/common/config"
	"go.mongodb.org/mongo-driver/bson"
)

//GetOne gets a single item from the selected colleciton.
func GetOne(targetCollection string, pattern bson.D, object interface{}) error {
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection(targetCollection)
	err := collection.FindOne(config.Config.MongoContext, pattern).Decode(object)

	if err != nil {
		return err
	}

	return nil
}

//GetAll gets the contents of the collection.
func GetAll(targetCollection string, objects interface{}) error {
	//TODO: Get this to actually work and fill/return an array.
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection(targetCollection)

	var values []interface{}

	cursor, err := collection.Find(config.Config.MongoContext, bson.D{})
	if err != nil {
		config.Config.Logger.Println(err) //TODO: Add proper error handling.
	}

	for cursor.Next(config.Config.MongoContext) {
		result := new(interface{})
		err := cursor.Decode(result)
		if err != nil {
			return err
		}
		values = append(values, result)
	}

	objects = values
	_ = objects
	return nil
}
