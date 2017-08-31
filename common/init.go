package common

import (
	"log"
	"time"

	"github.com/go-ini/ini"
	"github.com/gorilla/sessions"
)

var Base *BaseCtrl
var Cfg *CfgCtrl
var Sess = sessions.NewCookieStore([]byte("something-very-secret"))

type BaseCtrl struct {
	CfgCtrl
}
type CfgCtrl struct {
	Ini *ini.File
}

func init() {
	Base = &BaseCtrl{}
	Cfg = &CfgCtrl{}
	var err error
	Cfg.Ini, err = ini.Load("./ini/hmcms.ini")
	if err != nil {
		// common.Log.Error(err.Error())
		log.Fatal(err)
	}

}
func (c *CfgCtrl) Value(section string, key string) string {
	val := c.Ini.Section(section).Key(key).Value()

	return val
}
func (c *CfgCtrl) Int(section string, key string) (int, error) {
	val, err := c.Ini.Section(section).Key(key).Int()
	if err != nil {
		log.Fatal(err)
	}
	return val, err
}
func (c *CfgCtrl) Int64(section string, key string) (int64, error) {
	val, err := c.Ini.Section(section).Key(key).Int64()
	if err != nil {
		log.Fatal(err)
	}
	return val, err
}

func (c *CfgCtrl) Duration(section string, key string) (time.Duration, error) {
	val, err := c.Ini.Section(section).Key(key).Duration()
	if err != nil {
		log.Fatal(err)
	}
	return val, err
}
func (c *CfgCtrl) MustDuration(section string, key string) time.Duration {
	val := c.Ini.Section(section).Key(key).MustDuration()
	return val
}
