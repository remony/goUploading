package router

import (
	"github.com/labstack/echo"
	"github.com/remony/GoUploading/core/routes"
"github.com/remony/GoUploading/core/context"
)

func PerformRoutes(router *echo.Echo, apiRouter *echo.Group, streams *echo.Group, context context.Context) {
	//router.GET("/", routes.Index)
	//router.POST("/upload", routes.UploadImageRoute)
	//router.GET("*", func(c echo.Context) error {
	//	return c.File("client/lemon/dist/index.html")
	//})
	apiRouter.GET("/", routes.Index)
	apiRouter.POST("/files", routes.UploadImageAPIRoute)

//	Streaming routes
	streams.GET("/images", routes.ImageStream)
}
