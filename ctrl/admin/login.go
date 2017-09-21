package admin

import (
	"bytes"
	"fmt"
	"go-hmcms/models/sqlm"
	"hm-back-stage/common"
	"net"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
)

//Login return a LoginCtrl object
// var Login *LoginCtrl

//LoginCtrl extend to BaseCtrl
type LoginCtrl struct {
	common.BaseCtrl
}

// func init() {
// 	Login = &LoginCtrl{}
// }
func LoginCtrlObject() *LoginCtrl {
	return &LoginCtrl{}
}

//Index back-stage home page
func (c *LoginCtrl) Index(w http.ResponseWriter, r *http.Request) {

	c.Template(w, r, nil, "./view/admin/login/index.html")
}

func (c *LoginCtrl) Login(w http.ResponseWriter, r *http.Request) {

	username, password := r.PostFormValue("username"), r.PostFormValue("password")
	b := bytes.Buffer{}
	b.WriteString("errored")
	b.WriteString(username)
	s := b.String()
	fod, foundd := c.Cache().CacheGet(s)
	if foundd {
		if fod.(int) > 2 {
			// fmt.Fprint(w, c.ResponseJson(4, "密码错误3次，需要等待1分钟后再登录，谢谢！"))
			c.ResponseJson(4, "密码错误3次，需要等待1分钟后再登录，谢谢！", w, r)
			return
		}
	}
	isuser := govalidator.IsByteLength(username, 5, 15)
	ispass := govalidator.IsByteLength(password, 5, 15)
	switch false {
	case isuser:
		// fmt.Fprint(w, c.ResponseJson(4, "用户名的长度为5位到15位！"))
		c.ResponseJson(4, "用户名的长度为5位到15位！", w, r)
		return
	case ispass:
		// fmt.Fprint(w, c.ResponseJson(4, "密码的长度为5位到15位！"))
		c.ResponseJson(4, "密码的长度为5位到15位！", w, r)
		return
	default:
		// common.Log.Critical("1111")
		userone := sqlm.User{}
		sqls := "SELECT id,username,status FROM hm_user WHERE username = ? AND password = ?"
		err := c.Sql().Get(&userone, sqls, username, c.Sha1PlusMd5(password))
		if err != nil {
			// common.Log.Error(err)
			c.Log().CheckErr("Password Error", err)
			errored := 1
			b := bytes.Buffer{}
			b.WriteString("errored")
			b.WriteString(username)
			s := b.String()
			fo, found := c.Cache().CacheGet(s)
			if found {
				errored = fo.(int) + errored
			}
			c.Cache().CacheSetConfineTime(s, errored)
			// fmt.Fprint(w, c.ResponseJson(4, "用户名或密码错误！"))
			c.ResponseJson(4, "用户名或密码错误！", w, r)
		} else {
			if userone.Id != 0 {
				if userone.Status == 1 {
					ip, _, _ := net.SplitHostPort(r.RemoteAddr)
					if ip == "::1" {
						ip = "127.0.0.1"
					}
					ipinfo := c.TaobaoIP(ip)
					sqls := "INSERT INTO hm_login_log(username,login_time,login_ip,status,info,area,country,useragent,uid) VALUES(?,?,?,?,?,?,?,?,?)"
					tx := c.Sql().MustBegin()
					tx.MustExec(sqls, userone.Username, time.Now().Unix(), ip, 1, "登录成功", ipinfo.Data.Area, ipinfo.Data.Country, r.UserAgent(), userone.Id)
					tx.Commit()
					session, _ := common.Sess.Get(r, "hm-back-stage")
					session.Values["uid"] = userone.Id
					session.Values["username"] = userone.Username
					session.Values["status"] = userone.Status
					session.Save(r, w)
					// fmt.Fprint(w, c.ResponseJson(1, "登录成功，3秒后为你跳转！"))
					c.ResponseJson(1, "登录成功，3秒后位你跳转！", w, r)
					return
				} else {
					// fmt.Fprint(w, c.ResponseJson(4, "该账号已被封停！"))
					c.ResponseJson(4, "该账号已被封停！", w, r)
				}
			} else {
				// fmt.Fprint(w, c.ResponseJson(4, "用户名或密码错误！"))
				c.ResponseJson(4, "用户名或密码错误", w, r)
			}
		}
		fmt.Printf("%v", userone.Id)

		// row, err := sql.SelectOne(sqls, username, common.Sha1PlusMd5(password))
		// row := *rows
		// fmt.Println(row)
		// if err != nil {
		// 	common.LogerInsertText("./controllers/intendant/login.go:43line", err.Error())
		// 	return
		// } else {
		// 	if row["id"] != "" {
		// 		ip, _, _ := net.SplitHostPort(r.RemoteAddr)
		// 		if ip == "::1" {
		// 			ip = "127.0.0.1"
		// 		}
		// 		ipinfo := common.TaobaoIP(ip)
		// 		sqls := "INSERT INTO hm_login_log(username,login_time,login_ip,status,info,area,country,useragent,uid) VALUES(?,?,?,?,?,?,?,?,?)"
		// 		sql.Insert(sqls, row["username"], time.Now().Unix(), ip, 1, "登录成功", ipinfo.Data.Area, ipinfo.Data.Country, r.UserAgent(), row["id"])
		// 		session, _ := common.Sess.Get(r, "hmcms")
		// 		session.Values["uid"] = row["id"]
		// 		session.Values["username"] = row["username"]
		// 		session.Values["status"] = row["status"]
		// 		session.Save(r, w)
		//
		// 		fmt.Fprint(w, common.ResponseJson(1, "登录成功，3秒后为你跳转！"))
		// 		return
		// 	} else {
		// 		errored := 1
		// 		b := bytes.Buffer{}
		// 		b.WriteString("errored")
		// 		b.WriteString(username)
		// 		s := b.String()
		// 		fo, found := common.CacheGet(s)
		// 		if found {
		// 			errored = fo.(int) + errored
		// 		}
		// 		common.CacheSetConfineTime(s, errored)
		// 		fmt.Fprint(w, common.ResponseJson(4, "用户名或密码错误！"))
		// 	}
		// }

	}
}
