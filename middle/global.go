package middle

import (
	"context"
	"hm-back-stage/common"
	"net/http"
)

func ArticleCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// log.Println(r.Method, ";", r.RequestURI)
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
		ctx := context.WithValue(r.Context(), "article", "111")
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
