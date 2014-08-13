({
	appDir: "public_html",
    baseUrl: "js",
    paths: {
        source: 'source',
        lib: '../lib'
    },
	modules: [
        { name: "source/main" },
		{ name: "source/game" }
    ],
    dir: "public_html/js/dis"
 
})