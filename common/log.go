package common

import (
	"fmt"
	"runtime"

	"github.com/golang/glog"
)

//LogCtrl is local log object.
type LogCtrl struct {
}

//Log return a LogCtrl对象
func (c *BaseCtrl) Log() *LogCtrl {
	return &LogCtrl{}
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
				fmt.Print(FmtColor.Green("\n[PATH:] "), file, FmtColor.Green("\n[LINE:] "), line, FmtColor.Green("\n[INFO:] "), s)
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
