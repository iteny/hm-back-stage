package main

import (
	"flag"
	"fmt"
	"hm-back-stage/common"
	"hm-back-stage/ctrl/admin"
	"hm-back-stage/middle"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/shirou/gopsutil/mem"
)

type server struct {
	Addr         string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

// var infile *string = flag.String("i", "infile", "File contains values for sorting")
// var outfile *string = flag.String("o", "outfile", "File to receive sorted values")
// var algorithm *string = flag.String("a", "qsort", "Sort algorithm")

//entry function
func main() {
	flag.Set("alsologtostderr", "true")
	flag.Set("log_dir", "./log")
	// ds := flag.BoolVar(glog.logging.alsoToStderr, name, value, usage)
	// dd := flag.String("log_dir", "./log", "log file")
	flag.Parse()
	common.Log.Info("1111")
	common.Log.Warning("1111")
	common.Log.Error("1111")
	//check system info
	// glog.Error("asdfsdf")
	memre, _ := mem.VirtualMemory()
	fmt.Printf("Total: %v, Free:%v, UsedPercent:%f%%\n", memre.Total, memre.Free, memre.UsedPercent)
	server := &server{Addr: "80", ReadTimeout: 10, WriteTimeout: 10}
	if servPort := common.Cfg.Value("servSet", "port"); servPort != "" {
		server.Addr = servPort
	}
	if servReadTimeout, _ := common.Cfg.Int("servSet", "ReadTimeout"); servReadTimeout != 0 {
		server.ReadTimeout = time.Duration(servReadTimeout)
	}
	if servWriteTimeout, _ := common.Cfg.Int("servSet", "WriteTimeout"); servWriteTimeout != 0 {
		server.WriteTimeout = time.Duration(servWriteTimeout)
	}
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	// r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	// Set a timeout value on the request context (ctx), that will signal
	// through ctx.Done() that the request has timed out and further
	// processing should be stopped.
	r.Use(middleware.Timeout(60 * time.Second))
	//mount website back-stage routes
	r.Mount("/intendant", adminRoutes())
	//Easily serve static files
	workDir, _ := os.Getwd()
	filesDir := filepath.Join(workDir, "static")
	FileServer(r, "/static", http.Dir(filesDir))
	//http server
	s := &http.Server{
		Addr:           ":" + server.Addr,
		Handler:        r,
		ReadTimeout:    server.ReadTimeout * time.Second,
		WriteTimeout:   server.WriteTimeout * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Fatal(s.ListenAndServe())
}

//website back-stage routes
func adminRoutes() http.Handler {
	r := chi.NewRouter()
	r.Use(middle.ArticleCtx)
	r.Get("/login", admin.Login.Index) //sign in page

	r.Get("/", admin.Index.Index) //home page

	// r.Post("/login", admin.Login.Login) // sign in commit page
	return r
}

// FileServer conveniently sets up a http.FileServer handler to serve
// static files from a http.FileSystem.
func FileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit URL parameters.")
	}
	fs := http.StripPrefix(path, http.FileServer(root))
	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"
	r.Get(path, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fs.ServeHTTP(w, r)
	}))
}