package spells

import (
	"log"

	"github.com/cagox/fluxspells/app/database"
	"github.com/cagox/fluxspells/common/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

//GetSpells returns a list of all the spells in the database.
func GetSpells() []Spell {
	var allSpells []Spell
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("spells")

	cursor, err := collection.Find(config.Config.MongoContext, bson.D{})
	if err != nil {
		config.Config.Logger.Println(err) //TODO: Add proper error handling.
	}

	for cursor.Next(config.Config.MongoContext) {
		result := Spell{}
		err := cursor.Decode(result)
		if err != nil {
			config.Config.Logger.Println(err)
		}

		allSpells = append(allSpells, result)

	}

	return allSpells
}

//GetSpellBySlug returns a specific designated spell.
func GetSpellBySlug(slug string) *Spell {
	//collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("schools")
	var spell *Spell
	spell = new(Spell)

	err := database.GetOne("spells", bson.D{{Key: "slug", Value: slug}}, spell)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil
		}
		log.Fatal(err)
	}

	return spell
}
