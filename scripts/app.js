class App {
	incode = {
		apiUrl: "https://demo-api.incodesmile.com/",
		apiKey: "8960bab90f04847dcfbc78a01f1c0d15de767f92",
	};
	session;
	step;
	data = {};
	location = { latitude: 0, longitude: 0 };
}

var app = new App();

$(document).ready(function () {
	app.step = 1;
	$("button.btn-step").click(btnStep_Click);
	goToStep(app.step);
	getTerms();
});

function btnStep_Click(e) {
	var step = $(e.currentTarget).data("step");
	if (!!step) goToStep(step);
}

function getGeo() {}

function goToStep(step) {
	$("#frmData .container").find(".step.shown").removeClass("shown");
	$(`#frmData .container #dvStep${step}`).addClass("shown");
	app.step = step;
}

function getTerms() {
	$.getJSON("scripts/terms.json", function (data) {
		$("#dvStep1 .card-body .content").html(data.data);
	});
}
