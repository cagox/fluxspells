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

func init() {
	gob.Register(School{})
}
