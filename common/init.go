package common

import (
	"fmt"
	"log"
	"time"

	"github.com/go-ini/ini"
	"github.com/gorilla/sessions"
)

//Base global variable point to BaseCtrl object.
var Base *BaseCtrl

//Cfg global variable point to CfgCtrl object.
var Cfg *CfgCtrl

//Log global variable point to LogCtrl object.
//Log Level:Info < Warning < Error < Fatal
// var Log *LogCtrl

//Sess return a session object.
var Sess = sessions.NewCookieStore([]byte("something-very-secret"))

//BaseCtrl is base-object.
type BaseCtrl struct {
	CfgCtrl
	// LogCtrl
}

//CfgCtrl is local configugre object.
type CfgCtrl struct {
	Ini *ini.File
}

func init() {
	Base = &BaseCtrl{}
	Cfg = &CfgCtrl{}
	// Log = &LogCtrl{}
	var err error
	Cfg.Ini, err = ini.Load("./ini/hmcms.ini")
	if err != nil {
		fmt.Print(err)
	}
}

//Value return a string type configugre.
func (c *CfgCtrl) Value(section string, key string) string {
	val := c.Ini.Section(section).Key(key).Value()

	return val
}

//Int return a int type configugre.
func (c *CfgCtrl) Int(section string, key string) (int, error) {
	val, err := c.Ini.Section(section).Key(key).Int()
	if err != nil {
		log.Fatal(err)
	}
	return val, err
}

//Int64 return a int64 type configugre.
func (c *CfgCtrl) Int64(section string, key string) (int64, error) {
	val, err := c.Ini.Section(section).Key(key).Int64()
	if err != nil {
		log.Fatal(err)
	}
	return val, err
}

//Duration return a time.Duration type configugre.
func (c *CfgCtrl) Duration(section string, key string) (time.Duration, error) {
	val, err := c.Ini.Section(section).Key(key).Duration()
	if err != nil {
		log.Fatal(err)
	}
	return val, err
}

//MustDuration return a time.Duration type configugre.
func (c *CfgCtrl) MustDuration(section string, key string) time.Duration {
	val := c.Ini.Section(section).Key(key).MustDuration()
	return val
}
