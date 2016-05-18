package routes

import (
	"github.com/labstack/echo"
	"log"
	"os"
	"io"
	"net/http"
	"time"
	"github.com/remony/GoUploading/core/context"
	"encoding/json"
)

type ImageResponse struct {
	Response string `json:"response"`
	Timestamp time.Time `json:"timestamp"`
}

func UploadImageAPIRoute(c echo.Context) error {
	callback := c.QueryParam("callback")
	file, err := c.FormFile("file")

	if err != nil {
		log.Println("issue getting file")
		log.Println(err)
		return err
	}

	//	Open file
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	//	Choose where to save the file
	dir, err := os.Create("public/images/" + file.Filename)
	if err != nil {
		return err
	}
	defer dir.Close()

	//	Copy the file to that directory
	if _, err = io.Copy(dir, src); err != nil {
		return err
	}

	var response ImageResponse
	location := "data/" + file.Filename
	response.Response = location
	response.Timestamp = time.Now().UTC()
	context.AddImagetoContext(file.Filename)


	return c.JSONP(http.StatusOK, callback, response)
}

func UploadImageRoute(c echo.Context) error {


	file, err := c.FormFile("file")
	if err != nil {
		log.Println(err)
		return err
	}

//	Open file
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

//	Choose where to save the file
	dir, err := os.Create("public/images/" + file.Filename)
	if err != nil {
		return err
	}
	defer dir.Close()

//	Copy the file to that directory
	if _, err = io.Copy(dir, src); err != nil {
		return err
	}
	log.Println("http://localhost:3000/data/" + file.Filename)
	path := "/data/" + file.Filename;
	return c.Redirect(302, path)
	//return c.Render(http.StatusOK, "image", file.Filename)
}


func ImageStream(c echo.Context) error {
	c.Response().WriteHeader(http.StatusOK)

	images := context.GetContext().Images

	for _, l := range images {
		if err := json.NewEncoder(c.Response()).Encode(l); err != nil {
			return err
		}
		c.Response().(http.Flusher).Flush()
		time.Sleep(1 * time.Second)
	}
	return nil
}