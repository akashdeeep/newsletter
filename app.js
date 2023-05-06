const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
	const firstName = req.body.fname;
	const lastName = req.body.sname;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};
	const JsonData = JSON.stringify(data);
	url = "https://us8.api.mailchimp.com/3.0/lists/e58257304a";
	const options = {
		method: "POST",
		auth: "respecc:f9f920ed481269d00d3531bf98e5d185-us8",
	};

	const request = https.request(url, options, function (response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}
		response.on("data", function (data) {
			console.log(JSON.parse(data));
		});
	});
	request.write(JsonData);
	request.end();
});

app.post("/failure", function (req, res) {
	res.redirect("/");
});

app.listen(3000, function () {
	console.log("server is running");
});

//mailhimp api key = f9f920ed481269d00d3531bf98e5d185-us8
//listID = e58257304a
