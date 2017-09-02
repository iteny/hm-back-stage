package common

import (
	"fmt"
	"log"
	"runtime"
	"time"

	"github.com/go-ini/ini"
	"github.com/golang/glog"
	"github.com/gorilla/sessions"
)

//Base global variable point to BaseCtrl object.
var Base *BaseCtrl

//Cfg global variable point to CfgCtrl object.
var Cfg *CfgCtrl

//Log global variable point to LogCtrl object.
//Log Level:Info < Warning < Error < Fatal
var Log *LogCtrl

//Sess return a session object.
var Sess = sessions.NewCookieStore([]byte("something-very-secret"))

//BaseCtrl is base-object.
type BaseCtrl struct {
	CfgCtrl
}

//CfgCtrl is local configugre object.
type CfgCtrl struct {
	Ini *ini.File
}

//LogCtrl is local log object.
type LogCtrl struct {
}

func init() {
	Base = &BaseCtrl{}
	Cfg = &CfgCtrl{}
	Log = &LogCtrl{}
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

//Info echo a level-1 information
func (c *LogCtrl) Info(s interface{}) {
	if i, e := Cfg.Int("Debug", "model"); e != nil {
		fmt.Print(e)
	} else {
		if i > 0 {
			_, file, line, ok := runtime.Caller(1)
			// defer glog.Flush()
			if !ok {
				fmt.Print(FmtColor.Green("\n[PATH:] "), "not found file path!", "\n[LINE:] ", "not found file path!")
			} else {
				fmt.Print(FmtColor.Green("[PATH:] "), file, FmtColor.Green("\n[LINE:] "), line, FmtColor.Green("\n[INFO:] "), s)
			}
		}
	}
}

//Warning echo a level-2 information
func (c *LogCtrl) Warning(s interface{}) {
	if i, e := Cfg.Int("Debug", "model"); e != nil {
		fmt.Print(e)
	} else {
		if i > 1 {
			_, file, line, ok := runtime.Caller(1)
			// defer glog.Flush()
			if !ok {
				fmt.Print(FmtColor.Yellow("\n[PATH:] "), "not found file path!", "\n[LINE:] ", "not found file path!")
			} else {
				fmt.Print(FmtColor.Yellow("\n[PATH:] "), file, FmtColor.Yellow("\n[LINE:] "), line, FmtColor.Yellow("\n[INFO:] "), s)
			}
		}
	}
}

//Error echo a level-3 information and save log file
func (c *LogCtrl) Error(s interface{}) {
	if i, e := Cfg.Int("Debug", "model"); e != nil {
		fmt.Print(e)
	} else {
		if i > 2 {
			_, file, line, ok := runtime.Caller(1)
			defer glog.Flush()
			if !ok {
				fmt.Print("\n")
				glog.Info("\n[PATH:] ", "not found file path!", "\n[LINE:] ", "not found file path!")
			} else {
				fmt.Print("\n")
				glog.Info("\n[PATH:] ", file, "\n[LINE:] ", line, "\n[INFO:] ", s, "\n")
			}
		}
	}
}

//ErrorCheck echo a level-3 information and save log file.
//The incoming parameter is error type.
func (c *LogCtrl) ErrorCheck(err error) {
	if i, e := Cfg.Int("Debug", "model"); e != nil {
		fmt.Print(e)
	} else {
		if i > 2 {
			_, file, line, ok := runtime.Caller(1)
			defer glog.Flush()
			if !ok {
				fmt.Print("\n")
				glog.Info("\n[PATH:] ", "not found file path!", "\n[LINE:] ", "not found file path!")
			} else {
				if err != nil {
					fmt.Print("\n")
					glog.Info("\n[PATH:] ", file, "\n[LINE:] ", line, "\n[INFO:] ", err, "\n")
				}
			}
		}
	}
}
