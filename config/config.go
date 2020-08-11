package config

import (
	"encoding/json"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/mitchellh/go-homedir"

	//"github.com/gorilla/sessions"
	"github.com/gorilla/mux"

	"github.com/globalsign/mgo"
)

//Config holds the system configuration.
var Config *ConfigurationStruct

//ConfigurationStruct holds the configuration information for the program.
type ConfigurationStruct struct {
	FluxHost          string
	StaticPath        string
	MongoUserName     string
	MongoPassword     string
	DatabaseName      string
	MongoServerURL    string
	MongoSession      *mgo.Session
	TemplateRoot      string
	AdminToken        string
	MinimumNameLength int
	MinPasswordLength int
	EncKey            string
	AuthKey           string
	CookieName        string

	Router   *mux.Router
	Database *gorm.DB //Not in the Config File.
	Logger   *log.Logger
}

func init() {
	LoadConfiguration()
}

//LoadConfiguration Loads the configuration and sets the global variable.
func LoadConfiguration() {
	//TODO: Add error handling.
	Config = GetConfigs()
	Config.Router = mux.NewRouter()
	//Config.Router.Host(Config.FluxHost)
}

//GetConfigs returns a configuration struct.
func GetConfigs() *ConfigurationStruct {
	configpath := getConfigPath()
	ensureDirectory(configpath)

	configuration := ConfigurationStruct{}
	//err := gonfig.GetConf(configpath+"/gge.json", &configuration)

	file, err := os.Open(configpath + "/fluxspells.json")

	//If there is an error (if the file doesn't exist or is malformed) we will created a default  configuration.
	if err != nil {
		//return defaultConfiguration(configpath)
		panic("Configuration File Did Not Open")
	}

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&configuration)

	if err != nil {
		//return defaultConfiguration(configpath)
		panic("Configuration File Malformed.")
	}

	return &configuration
}

//ensureDirectory() makes sure the given directory exists or return an error.
func ensureDirectory(base string) error {
	_, statErr := os.Stat(base)

	if statErr != nil {
		createErr := os.MkdirAll(base, 0755)
		if createErr != nil {
			panic("Could not ensure the configuration path.")
		}
	}

	return nil
}

//getConfigPath() Gets the config path from the environmental variable or uses a default.
func getConfigPath() string {
	//First we figure out where the configuration files should be.
	configpath, isEnv := os.LookupEnv("FLUXSPELLSROOT")
	if !isEnv {
		home, _ := homedir.Dir() //TODO: Add error checking.
		configpath = home + "/.config/fluxspellsconf"
	}
	return configpath
}
