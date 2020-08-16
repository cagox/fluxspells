package schools

import (
	"errors"
	"fmt"
	"net/url"
	"strings"

	"github.com/cagox/fluxspells/common/config"
	"github.com/globalsign/mgo/bson"
)

//GetSchools returns a list of all the schools in the database.
func GetSchools() []School {
	var allSchools []School
	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()

	collection := mongoSession.DB(config.Config.DatabaseName).C("schools")

	err := collection.Find(nil).All(&allSchools)
	if err != nil {
		fmt.Println(err) //TODO: Add proper error handling.
	}

	return allSchools
}

//GetSchoolBySlug returns a school assigned to a specific slug.
func GetSchoolBySlug(slug string) *School {
	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()
	allSchools := mongoSession.DB(config.Config.DatabaseName).C("schools")
	var school *School

	err := allSchools.Find(bson.M{"slug": slug}).One(&school)
	if err != nil {
		//TODO Error handling
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
	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()
	collection := mongoSession.DB(config.Config.DatabaseName).C("schools")

	count, err := collection.Find(bson.M{"slug": slug}).Count()
	if err != nil {
		fmt.Println(err) //TODO: Proper Error HAndling.
	}

	if count > 0 {
		return false
	}
	return true
}

//InsertNewSchool adds a new school to the database.
func InsertNewSchool(school *School) error {
	if !(ValidateIsSlugUnique(school.Slug)) {
		return errors.New("Name too similar")
	}

	mongoSession := config.Config.MongoSession.Clone()
	defer mongoSession.Close()
	allSchools := mongoSession.DB(config.Config.DatabaseName).C("schools")

	err := allSchools.Insert(&school)
	if err != nil {
		return err
	}
	return nil
}
