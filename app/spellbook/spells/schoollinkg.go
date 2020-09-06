package spells

import (
	"github.com/cagox/fluxspells/app/spellbook/schools"
	"github.com/cagox/fluxspells/common/config"
	"go.mongodb.org/mongo-driver/bson"
)

//SchoolLink provides a linkage between spells and schools.
type SchoolLink struct {
	SpellSlug  string
	SchoolSlug string
}

//GetSpellsBySchool returns a list of spells associated with the given school.
func GetSpellsBySchool(schoolSlug string) []Spell {
	var schoolSpells []Spell
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("schoollinks")

	cursor, err := collection.Find(config.Config.MongoContext, bson.D{{Key: "SchoolSlug", Value: schoolSlug}})
	if err != nil {
		config.Config.Logger.Println(err) //TODO: Add proper error handling.
	}

	for cursor.Next(config.Config.MongoContext) {
		link := SchoolLink{}
		err := cursor.Decode(link)
		if err != nil {
			config.Config.Logger.Println(err.Error())
		}
		spell := GetSpellBySlug(link.SpellSlug)

		schoolSpells = append(schoolSpells, *spell)
	}

	return schoolSpells
}

//GetSchoolsBySpell returns a list of spells associated with the given spell.
func GetSchoolsBySpell(spellSlug string) []schools.School {
	var spellSchools []schools.School
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("schoollinks")

	cursor, err := collection.Find(config.Config.MongoContext, bson.D{{Key: "SpellSlug", Value: spellSlug}})
	if err != nil {
		config.Config.Logger.Println(err) //TODO: Add proper error handling.
	}

	for cursor.Next(config.Config.MongoContext) {
		link := SchoolLink{}
		err := cursor.Decode(link)
		if err != nil {
			config.Config.Logger.Println(err.Error())
		}
		school := schools.GetSchoolBySlug(link.SchoolSlug)

		spellSchools = append(spellSchools, *school)
	}

	return spellSchools
}
