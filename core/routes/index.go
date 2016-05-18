package routes

import (
	"github.com/labstack/echo"
	"net/http"
	"time"
)

func Index(c echo.Context) error {
	return c.Render(http.StatusOK, "index", time.Now())
}