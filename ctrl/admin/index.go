package admin

import (
	"hm-back-stage/common"
	"net/http"
)

var Index *IndexCtrl

type IndexCtrl struct {
	common.BaseCtrl
}

func init() {
	Index = &IndexCtrl{}
}
func (c *IndexCtrl) Index(w http.ResponseWriter, r *http.Request) {

}
