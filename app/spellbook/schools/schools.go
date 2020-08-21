package schools

import (
	"encoding/gob"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//School represents a school of magic.
type School struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
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
