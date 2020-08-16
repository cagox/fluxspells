package schools

import (
	"encoding/gob"

	"github.com/globalsign/mgo/bson"
)

//School represents a school of magic.
type School struct {
	ID          bson.ObjectId `bson:"_id,omitempty"`
	Name        string
	Slug        string
	Description string
}

//CreateSchoolForm is a helper type to make new schools forms easier.
type CreateSchoolForm struct {
	Name        string
	Description string
}

func init() {
	gob.Register(School{})
}
