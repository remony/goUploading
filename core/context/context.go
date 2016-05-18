package context

type Context struct {
	Images []string `json:"images"`
}

var context Context

func GetContext() Context {
	return context
}

func AddImagetoContext(path string) {
	context.Images = append(context.Images, path)
}

func GetNewContext() Context {
	return Context{}
}
