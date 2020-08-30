package schools

import (
	"errors"
)

//ErrorNameTooSimilar means that the slugified version of the name is not unique.
var ErrorNameTooSimilar error

//ErrorNoSuchDocument means that the document they were trying to find or update did not exist.
var ErrorNoSuchDocument error

//ErrorUpdateFailed means that something went wrong updating the document.
var ErrorUpdateFailed error

func init() {
	ErrorNameTooSimilar = errors.New("Name too similar")
	ErrorNoSuchDocument = errors.New("Document didn't exist")
	ErrorUpdateFailed = errors.New("Could not update document")
}
