package database

import (
	//"fmt"
	"time"
	//Database Stuff
	"github.com/globalsign/mgo"

	"github.com/cagox/fluxspells/config"
)

//DialMongoSession starts the main mongo session.
func DialMongoSession() {
	config.Config.Logger.Println("Database: " + config.Config.DatabaseName + "        User: " + config.Config.MongoUserName)
	addresses := make([]string, 1)
	addresses[0] = config.Config.MongoServerURL
	info := mgo.DialInfo{
		Addrs:    addresses,
		Timeout:  60 * time.Second,
		Database: config.Config.DatabaseName,
		//ReplicaSetName: "godgameengine",     //Will be uncomented, and possibly edited, if I end up using a ReplicaSet
		//Source: "gge",                       //Defaults to Database (i.e. gge)
		Username: config.Config.MongoUserName,
		Password: config.Config.MongoPassword,
		AppName:  "fluxspells"} //Not sure if AppName is needed.

	session, err := mgo.DialWithInfo(&info)
	if err != nil {
		panic(err)
	}
	session.SetMode(mgo.Monotonic, true)

	config.Config.MongoSession = session
}
