package server

import (
	"net/http"
	"github.com/labstack/echo"
	"github.com/remony/GoUploading/core/router"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/echo/engine/standard"
	"html/template"
	"io"
	"github.com/remony/GoUploading/core/context"
)

func Index(w http.ResponseWriter, r *http.Request) {
	//fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func Start(port int) {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.CORS())




	t := &Template{
		templates: template.Must(template.ParseGlob("public/views/*.html")),
	}

	e.SetRenderer(t)


	api := e.Group("/api/v1")

	data := e.Group("/data")
	data.Use(middleware.Static("public/images"))

	streams := e.Group("/streams")


	e.Static("/", "client")
	router.PerformRoutes(e, api, streams, context.GetContext())


	e.Run(standard.New(":9000"))

}




