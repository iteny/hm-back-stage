package common

import (
	"fmt"
	"html/template"
	"io"
	"log"
	"net"
	"net/http"
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
func (c *BaseCtrl) Template(w io.Writer, r *http.Request, data interface{}, filenames ...string) {
	ip, _, _ := net.SplitHostPort(r.RemoteAddr)
	if ip == "::1" {
		ip = "127.0.0.1"
	}
	ExcuteTime := c.TimeString(r, "ExcuteTime")
	defer Log().Debug().Str("[Method]", r.Method).Str("[Addr]", r.RequestURI).Str("[Ip]", ip).Str("[Status]", "200").Str("[ExcuteTime]", ExcuteTime).Msg("Contect")
	t, err := template.ParseFiles(filenames...)
	c.Log().CheckErr("Template Error", err)
	err = t.Execute(w, data)
	c.Log().CheckErr("Template Error", err)
}
func (c *BaseCtrl) TimeString(r *http.Request, contextName string) string {
	contextValue := r.Context().Value("ExcuteTime")
	if contextValue != nil {
		timetype := time.Unix(r.Context().Value("ExcuteTime").(int64), 0)
		now := time.Now()
		duration := now.Sub(timetype)
		return duration.String()
	} else {
		return "0ms"
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
