package admin

import (
	"fmt"
	"hm-back-stage/common"
	"html/template"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
)

//Login return a LoginCtrl object
var Login *LoginCtrl

//LoginCtrl extend to BaseCtrl
type LoginCtrl struct {
	common.BaseCtrl
}

func init() {
	Login = &LoginCtrl{}
}

//Index back-stage home page
func (c *LoginCtrl) Index(w http.ResponseWriter, r *http.Request) {
	// execDirAbsPath, _ := os.Getwd()
	// log.Println("执行程序所在目录的绝对路径　　　　　　　:", execDirAbsPath)
	//
	// execFileRelativePath, _ := exec.LookPath(os.Args[0])
	// log.Println("执行程序与命令执行目录的相对路径　　　　:", execFileRelativePath)
	//
	// execDirRelativePath, _ := path.Split(execFileRelativePath)
	// log.Println("执行程序所在目录与命令执行目录的相对路径:", execDirRelativePath)
	//
	// execFileAbsPath, _ := filepath.Abs(execFileRelativePath)
	// log.Println("执行程序的绝对路径　　　　　　　　　　　:", execFileAbsPath)
	//
	// execDirAbsPath, _ = filepath.Abs(execDirRelativePath)
	// log.Println("执行程序所在目录的绝对路径　　　　　　　:", execDirAbsPath)
	//
	// os.Chdir(execDirRelativePath) //进入目录
	// enteredDirAbsPath, _ := os.Getwd()
	// log.Println("所进入目录的绝对路径　　　　　　　　　　:", enteredDirAbsPath)
	ptr, file, line, ok := runtime.Caller(0)
	fmt.Println(file, line)
	fmt.Println(ptr)
	fmt.Println(ok)
	// file, _ := exec.LookPath(os.Args[0])
	// ApplicationPath, _ := filepath.Abs(file)
	// ApplicationDir, _ := filepath.Split(ApplicationPath)
	// fmt.Println(ApplicationDir)
	// fmt.Println(ApplicationPath)
	tl, _ := template.ParseFiles("./view/admin/login/index.html")
	tl.Execute(w, nil)
}

func getCurrentPath() string {
	file, _ := exec.LookPath(os.Args[0])
	fmt.Println("file:", file)
	path, _ := filepath.Abs(file)
	fmt.Println("path:", path)
	splitstring := strings.Split(path, "\\")
	size := len(splitstring)
	splitstring = strings.Split(path, splitstring[size-1])
	ret := strings.Replace(splitstring[0], "\\", "/", size-1)
	return ret
}

// func (c *LoginCtrl) Login(w http.ResponseWriter, r *http.Request) {
// 	username, password := r.PostFormValue("username"), r.PostFormValue("password")
// 	b := bytes.Buffer{}
// 	b.WriteString("errored")
// 	b.WriteString(username)
// 	s := b.String()
// 	fod, foundd := common.CacheGet(s)
// 	if foundd {
// 		if fod.(int) > 2 {
// 			fmt.Fprint(w, common.ResponseJson(4, "密码错误3次，需要等待1分钟后再登录，谢谢！"))
// 			return
// 		}
// 	}
// 	isuser := govalidator.IsByteLength(username, 5, 15)
// 	ispass := govalidator.IsByteLength(password, 5, 15)
// 	switch false {
// 	case isuser:
// 		fmt.Fprint(w, common.ResponseJson(4, "用户名的长度为5位到15位！"))
// 		return
// 	case ispass:
// 		fmt.Fprint(w, common.ResponseJson(4, "密码的长度为5位到15位！"))
// 		return
// 	default:
// 		// common.Log.Critical("1111")
// 		userone := sqlm.User{}
// 		sqls := "SELECT id,username,status FROM hm_user WHERE username = ? AND password = ?"
// 		err := sqlm.DB.Get(&userone, sqls, username, common.Sha1PlusMd5(password))
// 		if err != nil {
// 			common.Log.Error(err)
// 			errored := 1
// 			b := bytes.Buffer{}
// 			b.WriteString("errored")
// 			b.WriteString(username)
// 			s := b.String()
// 			fo, found := common.CacheGet(s)
// 			if found {
// 				errored = fo.(int) + errored
// 			}
// 			common.CacheSetConfineTime(s, errored)
// 			fmt.Fprint(w, common.ResponseJson(4, "用户名或密码错误！"))
// 		} else {
// 			if userone.Id != 0 {
// 				if userone.Status == 1 {
// 					ip, _, _ := net.SplitHostPort(r.RemoteAddr)
// 					if ip == "::1" {
// 						ip = "127.0.0.1"
// 					}
// 					ipinfo := common.TaobaoIP(ip)
// 					sqls := "INSERT INTO hm_login_log(username,login_time,login_ip,status,info,area,country,useragent,uid) VALUES(?,?,?,?,?,?,?,?,?)"
// 					tx := sqlm.DB.MustBegin()
// 					tx.MustExec(sqls, userone.Username, time.Now().Unix(), ip, 1, "登录成功", ipinfo.Data.Area, ipinfo.Data.Country, r.UserAgent(), userone.Id)
// 					tx.Commit()
// 					session, _ := common.Sess.Get(r, "hmcms")
// 					session.Values["uid"] = userone.Id
// 					session.Values["username"] = userone.Username
// 					session.Values["status"] = userone.Status
// 					session.Save(r, w)
// 					fmt.Fprint(w, common.ResponseJson(1, "登录成功，3秒后为你跳转！"))
// 					return
// 				} else {
// 					fmt.Fprint(w, common.ResponseJson(4, "该账号已被封停！"))
// 				}
// 			} else {
// 				fmt.Fprint(w, common.ResponseJson(4, "用户名或密码错误！"))
// 			}
// 		}
// 		fmt.Printf("%v", userone.Id)
//
// 		// row, err := sql.SelectOne(sqls, username, common.Sha1PlusMd5(password))
// 		// row := *rows
// 		// fmt.Println(row)
// 		// if err != nil {
// 		// 	common.LogerInsertText("./controllers/intendant/login.go:43line", err.Error())
// 		// 	return
// 		// } else {
// 		// 	if row["id"] != "" {
// 		// 		ip, _, _ := net.SplitHostPort(r.RemoteAddr)
// 		// 		if ip == "::1" {
// 		// 			ip = "127.0.0.1"
// 		// 		}
// 		// 		ipinfo := common.TaobaoIP(ip)
// 		// 		sqls := "INSERT INTO hm_login_log(username,login_time,login_ip,status,info,area,country,useragent,uid) VALUES(?,?,?,?,?,?,?,?,?)"
// 		// 		sql.Insert(sqls, row["username"], time.Now().Unix(), ip, 1, "登录成功", ipinfo.Data.Area, ipinfo.Data.Country, r.UserAgent(), row["id"])
// 		// 		session, _ := common.Sess.Get(r, "hmcms")
// 		// 		session.Values["uid"] = row["id"]
// 		// 		session.Values["username"] = row["username"]
// 		// 		session.Values["status"] = row["status"]
// 		// 		session.Save(r, w)
// 		//
// 		// 		fmt.Fprint(w, common.ResponseJson(1, "登录成功，3秒后为你跳转！"))
// 		// 		return
// 		// 	} else {
// 		// 		errored := 1
// 		// 		b := bytes.Buffer{}
// 		// 		b.WriteString("errored")
// 		// 		b.WriteString(username)
// 		// 		s := b.String()
// 		// 		fo, found := common.CacheGet(s)
// 		// 		if found {
// 		// 			errored = fo.(int) + errored
// 		// 		}
// 		// 		common.CacheSetConfineTime(s, errored)
// 		// 		fmt.Fprint(w, common.ResponseJson(4, "用户名或密码错误！"))
// 		// 	}
// 		// }
//
// 	}
// }
