package schools

import (
	"errors"
	"log"
	"net/url"
	"strings"

	"github.com/cagox/fluxspells/common/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

//GetSchools returns a list of all the schools in the database.
func GetSchools() []School {
	var allSchools []School
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("schools")

	cursor, err := collection.Find(config.Config.MongoContext, bson.D{})
	if err != nil {
		config.Config.Logger.Println(err) //TODO: Add proper error handling.
	}

	for cursor.Next(config.Config.MongoContext) {
		result := School{}
		err := cursor.Decode(result)
		if err != nil {
			config.Config.Logger.Println(err)
		}

		allSchools = append(allSchools, result)

	}

	return allSchools
}

//GetSchoolBySlug returns a school assigned to a specific slug.
func GetSchoolBySlug(slug string) *School {
	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("schools")
	var school *School
	school = new(School)

	err := collection.FindOne(config.Config.MongoContext, bson.D{{"slug", slug}}).Decode(school)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil
		}
		log.Fatal(err)
	}

	return school
}

//CreateSchoolFromForm creates a School object from a CreateSchoolForm object
//This does not validate the uniqueness of the school name.
func CreateSchoolFromForm(newSchool CreateSchoolForm) *School {
	school := &School{Name: newSchool.Name, Description: newSchool.Description, Slug: generateSchoolSlug(newSchool.Name)}
	return school
}

//generateSchoolStub will format a proper stub for the proposed school entry.
//For the moment, we are removing spaces and URLencoding the results.
//I will work to improve this later before it makes its way into more
//sensitive projects.
func generateSchoolSlug(value string) string {
	var slug string
	//Remove whitespace
	slug = strings.ReplaceAll(value, " ", "")
	//Fix special characters
	slug = url.QueryEscape(slug)
	return slug
}

//ValidateIsSlugUnique Returns true if the school with matching slug does not already exist
func ValidateIsSlugUnique(slug string) bool {
	school := GetSchoolBySlug(slug)

	if school != nil {
		return false
	}
	return true
}

//InsertNewSchool adds a new school to the database.
func InsertNewSchool(school *School) error {
	if !(ValidateIsSlugUnique(school.Slug)) {
		return errors.New("Name too similar")
	}

	collection := config.Config.MongoClient.Database(config.Config.DatabaseName).Collection("schools")


	_, err := collection.InsertOne(config.Config.MongoContext, school)
	if err != nil {
		return err
	}
	return nil
}
