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
		cookie, err := r.Cookie("back-language")
		if err != nil {
			common.Log().Debug().Str("[back-language-reload]", "cn").Str("[Error]", err.Error()).Msg("back-stage language set fail")
			homeLanguage := &http.Cookie{
				Name:     "back-language",
				Value:    "cn",
				Path:     "/",
				HttpOnly: false,
				MaxAge:   80000,
			}
			http.SetCookie(w, homeLanguage)
		} else {
			common.Log().Debug().Str("[back-language]", cookie.Value).Msg("back-stage language set success")
		}

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
