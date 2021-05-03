class App {
	incode = {
		apiUrl: "https://demo-api.incodesmile.com/",
		apiKey: "8960bab90f04847dcfbc78a01f1c0d15de767f92",
	};
	session;
	step;
	data = {
		terms: {
			accepted: false,
		},
	};
	location = { latitude: 0, longitude: 0 };
}

let appObj = new App();
let session;
let onBoarding;

$(document).ready(function () {
	appObj.step = 1;
	$("button.btn-step").click(btnStep_Click);
	$("#btnGetLocation").click(btnGetLocation_Click);
	goToStep(appObj.step);
	getTerms();
});

async function app() {
	onBoarding = createOnBoarding();
	await onBoarding.warmup();
	session = await createSession();
}

function btnGetLocation_Click() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getCurrentPosition);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function getCurrentPosition(position) {
	const latitude1 = position.coords.latitude;
	const longitude1 = position.coords.longitude;

	var resultgeo = onBoarding
		.addGeolocation({
			token: session,
			latitude: latitude1,
			longitude: longitude1,
		})
		.then((res) => showLocation(res.location));
}

function showLocation(location) {
	$('.current-location').html(location)
}

function btnStep_Click(e) {
	var step = $(e.currentTarget).data("step");
	var action = $(e.currentTarget).data("action");
	performAction(action);
	if (!!step) goToStep(step);
}

function goToStep(step) {
	$("#frmData .container").find(".step.shown").removeClass("shown");
	$(`#frmData .container #dvStep${step}`).addClass("shown");
	appObj.step = step;
}

function performAction(action) {
	switch (action) {
		case "accept-terms":
			appObj.data.terms.accepted = true;
	}
}

function getTerms() {
	$.getJSON("scripts/terms.json", function (data) {
		$("#dvStep1 .card-body .content").html(data.data);
	});
}

//////////// OnBoarding
function createOnBoarding() {
	return window.OnBoarding.create({
		apiKey: appObj.incode.apiURL,
		apiURL: appObj.incode.apiKey,
		lang: "en-US",
	});
}
