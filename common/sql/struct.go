package sql

import "database/sql"

type User struct {
	Id         int
	Username   string
	Password   string
	Nickname   string
	Email      string
	CreateTime int
	CreateIp   string
	Remake     string
	Status     int
}

//table hm_auth_rule
type AuthRule struct {
	Id       int            `json:"id"`
	Url      string         `json:"url"`
	Name     string         `json:"name"`
	Pid      int            `json:"pid"`
	Isshow   int            `json:"isshow"`
	Sort     int            `json:"sort"`
	Icon     string         `json:"iconSkin"`
	Level    int            `json:"level"`
	Color    sql.NullString `json:"color"`
	Language string         `json:"language"`
	Children []AuthRule     `json:"children"`
}

//递归重新排序无限极分类
func RecursiveMenu(arr []AuthRule, pid int, level int) (ar []AuthRule) {
	array := make([]AuthRule, 0)
	// levelnum = 1
	// fmt.Println(arr)
	for k, v := range arr {
		if pid == v.Pid {

			arr[k].Level = level + 1
			array = append(array, arr[k])
			// fmt.Printf("%#v", array)

		}
	}
	for tk, tv := range array {
		rm := RecursiveMenu(arr, tv.Id, level+1)
		for sk, _ := range rm {
			array[tk].Children = append(array[tk].Children, rm[sk])
		}

		// array = append(array, rm[km])
		// array[km].Level = array[km].Level + 1
	}
	return array
}
