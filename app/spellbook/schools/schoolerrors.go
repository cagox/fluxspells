package schools

import (
	"errors"
)

//ErrorNameTooSimilar means that the slugified version of the name is not unique.
var ErrorNameTooSimilar error

func init() {
	ErrorNameTooSimilar = errors.New("Name too similar")
}
