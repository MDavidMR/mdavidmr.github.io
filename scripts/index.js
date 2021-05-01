let onBoarding;
let session;


const container = document.getElementById("camera-container");
const maincontainer = document.getElementById("maincontainer");
const terminos = document.getElementById("terms1-container");
const messagecontainer = document.getElementById("UserMessageContainer");
const entidadcontainer = document.getElementById("entidadfederativa");

function createOnBoarding() {
  const apiURL = "https://demo-api.incodesmile.com/";
  const apiKey = "8960bab90f04847dcfbc78a01f1c0d15de767f92";
  
  return window.OnBoarding.create({
    apiKey: apiKey,
    apiURL: apiURL,
    lang: "es",
    theme: {
      main: "red",
      mainButton: {
        borderRadius: "20px",
        color: "black",
        border: "4px solid gray"
      }
    },
    translations: {
      tutorial: {
        front1: "Alinea tu teléfono paralelamente a tu ID",
        front2: "La foto se tomará automáticamente",
        back1: "Now scan the ",
        back2: "back side ",
        back3: "of your ID",
        selfie1: "Let's take a selfie",
        selfie2: "Keep a neutral expression, find balanced",
        selfie3: "light and remove any glasses and hats",
        passport1: "Align your passport to the frame and take a photo",
        passport2: "Position just the page with the photo"
      }
    }
  });
}
 
 
function seleccionoentidad(){
  var entidadfederativa = document.getElementById("estado");
  alert("llamar al renave");
}

function createSession() {
  return onBoarding.createSession("MX");
}

function PedirEntidad() {
  entidadcontainer.visibility="visible";
}

function showError() {
  alert("Some error");
}
entidadcontainer
function showTerms1() {
 terminos.style.visibility="visible";
}
function aceptoterminos1() {
  onBoarding.sendGeolocation({ token: session }).then(res => res);
  terminos.style.visibility="hidden";
  container.style.visibility="visible";
  renderFrontTutorial();
  return true;
}

async function obtenerScore() {
  const scoreData = '{"overall":"71.3"}';
 //const score = await onBoarding.getScore({ token:"60899c3ac29ba80012efa57b" });
 objoScore = JSON.parse(scoreData);
 const  { overral} = objoScore;
 if (objoScore['overall']>80)
       obtenerInformacion();
    else  
       container.style.visibility="hidden";
       messagecontainer.style.visibility="visible";
      
}
 

async function obtenerInformacion() {
 
 // const ocrData = await onBoarding.ocrData({token:session});
 const ocrData = '{"name":"Jose", "curp":"","address":""}';
 //const ocrData = '{"name":"Jose", "curp":"GOAS471103MYNNGN08","address":"725 5th Ave, New York, NY 10022"}';
  objocrData = JSON.parse(ocrData);
  const { name, curp,address} = objocrData;
  //validate if CURP is empty
  if (curp.length == 0) {
    PedirEntidad()
   }else {
    alert(curp)
  }
  if (address.length == 0) {
    alert("pedir comprobante domiciliario");
   }else {
    alert(address)
  }

}
 
function showErrorSignature() {
  alert("Signature error");
}
function renderFrontTutorial() {
  onBoarding.renderFrontTutorial(container, {
    onSuccess: renderFrontIDCamera,
    noWait: true
  });
}

function renderFrontIDCamera() {
  onBoarding.renderCamera("front", container, {
    onSuccess: (result) => renderBackIDCamera(),
    onError: showError,
    token: session,
    numberOfTries: -1,
    noWait: true
  });
}

function renderBackIDCamera() {
  onBoarding.renderCamera("back", container, {
    onSuccess: processId,
    onError: showError,
    token: session,
    numberOfTries: -1
  });
}

function renderSelfieCamera() {
  onBoarding.renderCamera("selfie", container, {
    onSuccess: () => {
      obtenerInformacion();
    },
    onError: showError,
    token: session,
    numberOfTries: 3
  });
}
 



function getLocation() {
  
  container.style.visibility="visible";
  var resultsendgeo= onBoarding.sendGeolocation({ token:session}).then(res => res)
 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    geocontainer.innerHTML = "Geolocation is not supported by this browser.";
    
  }
}

function showPosition(position) {
  const latitude1  = position.coords.latitude;
  const longitude1 = position.coords.longitude;
  geocontainer.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  var resultgeo= onBoarding.addGeolocation({ token:session,latitude:latitude1,longitude: longitude1 }).then(res => res)
 // var obj = JSON.parse(resultgeo);
 // alert(obj.location);
}

function renderSignature() {
onBoarding.renderSignature(container, {
  token:session,
  onSuccess: showErrorSignature,
  onError: showErrorSignature,
})
}
function sendGeoLocation() {
  onBoarding.sendGeolocation({ session }).then(res => res);
 //onBoarding.addGeolocation({ token:session, latitude:20.967370, longitude:-89.592586 }).then(res => res)
 }

function renderVideoConference() {
  onBoarding.renderConference(
    container,
    {
      token: session
    },
    {
      onSuccess: (status) => {
        console.log("success");
       C `<p>Success with status ${status}</p>`;
      },
      onError: (error) => {
        console.log("error", error);
        container.innerHTML = `<p>Success with status ${error}</p>`;
      },
      onLog: (...params) => console.log("onLog", ...params)
    }
  );
}
function disableSubmit() {
  document.getElementById("submit").disabled = true;
 }

  function activateButton(element) {

      if(element.checked) {
        document.getElementById("submit").disabled = false;
       }
       else  {
        document.getElementById("submit").disabled = true;
      }

  }
function processId() {
  container.innerHTML = "<p>Loading...</p>";
  //container.innerHTML = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  onBoarding.processId({ token: session.token }).then(() => {
    container.innerHTML = "";
    obtenerScore() ;
    obtenerInformacion() ;

    //renderSelfieCamera();
  });
}

async function app() {
  onBoarding = createOnBoarding(); // initialize the instance
  await onBoarding.warmup();
   session = await createSession();
 // obtenerInformacion();
 //obtenerScore();
 showTerms1();
// PedirEntidad();
 
}

app();

