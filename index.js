const req = require('superagent'),
	fs = require("fs"),
	stt = require("swagger-test-templates"),
	config = {
		assertionFormat: "expect",
		testModule: "request",
		// pathName: [],
		pathName: ['/user', '/user/{username}'],
		pathParams: {
			"username": "test1234"
		},
		// statusCodes: ["200"],
		maxLen: -1
	};


req
	.get('http://petstore.swagger.io/v2/swagger.json')
	.then((res) => {
		let swagger = res.body;
		let tests = stt.testGen(swagger, config);

		if (!fs.existsSync('./test'))
			fs.mkdirSync('./test');

		tests.forEach(function (element) {
			fs.writeFile("./test/" + element.name, element.test, (err) => {
				if (err) throw err;

				console.log(element.name, " written");
			});
		}, this);

	});
