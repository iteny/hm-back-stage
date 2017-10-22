package admin

import (
	"fmt"
	"hm-back-stage/common"
	"hm-back-stage/common/sql"
	"net/http"
)

// var Index *IndexCtrl

type IndexCtrl struct {
	common.BaseCtrl
}

func IndexCtrlObject() *IndexCtrl {
	return &IndexCtrl{}
}

// func init() { Index = &IndexCtrl{} }
func (c *IndexCtrl) Index(w http.ResponseWriter, r *http.Request) {
	c.Template(w, r, nil, "./view/admin/index/index.html")
}
func (c *IndexCtrl) GetMenu(w http.ResponseWriter, r *http.Request) {
	// pid := r.PostFormValue("pid")
	// intpid, _ := strconv.Atoi(pid)
	sqls := "SELECT * FROM hm_auth_rule"
	rule := []sql.AuthRule{}
	err := c.Sql().Select(&rule, sqls)
	if err != nil {
		c.Log().Debug().Err(err).Msg("错误")
		c.ResponseJson(4, err.Error(), w, r)
	}
	ar := sql.RecursiveMenu(rule, 0, 0)
	// fmt.Println(rule)
	// for k, v := range rule {
	// 	srule := []sqlm.AuthRule{}
	// 	err = c.Sql().Select(&srule, sqls, v.Id)
	// 	if err != nil {
	// 		c.Log().Debug().Err(err).Msg("错误")
	// 		c.ResponseJson(4, err.Error(), w, r)
	// 	}
	// 	for tk, _ := range srule {
	// 		rule[k].Children = append(rule[k].Children, srule[tk])
	// 	}
	// }
	// fmt.Println(ar)
	fmt.Fprint(w, c.RowsJson(ar))
}
