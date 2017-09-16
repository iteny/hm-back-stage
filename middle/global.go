package middle

import (
	"context"
	"hm-back-stage/common"
	"net/http"
	"time"
)

func ArticleCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// log.Println(r.Method, ";", r.RequestURI)

		// fmt.Println(r.Proto)
		//
		// common.Log().Debug().Str("[Method]", r.Method).Str("[Addr]", r.Host+r.RequestURI).Str("[Ip]", ip).Str("[Status]", "").Msg("Contect")
		// defer common.Log().Debug().Str("[Method]", r.Method).Str("[Addr]", r.Host+r.RequestURI).Str("[Ip]", ip).Str("[Status]", "").Msg("Contect")
		// fmt.Printf("%c[1;40;32m%s%c[0m", 0x1B, "testPrintColor", 0x1B)
		switch r.RequestURI {
		case "/intendant/login":
			// fmt.Println("草拟吗")
		default:
			session, _ := common.Sess.Get(r, "hm-back-stage")
			userId := session.Values["uid"]
			if userId == nil {
				http.Redirect(w, r, "/intendant/login", http.StatusFound)
			}
		}

		// if err != nil {
		// 	http.Error(w, http.StatusText(404), 404)
		// 	return
		// }
		ctx := context.WithValue(r.Context(), "ExcuteTime", time.Now().Unix())
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
