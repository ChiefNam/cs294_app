
// Code for general function of App
let loveCalculatorBtn = document.getElementById("loveCalculatorBtn")
let dogGeneratorBtn = document.getElementById("dogImgGenerator")
let googleChartBtn = document.getElementById("googleChart")
let selfieBtn = document.getElementById("selfie")
let backBtn = document.getElementById("back")
let loveCalculatorResult = document.getElementById("loveAPIResult")
let generateNames = document.getElementById("generateNames")
let dogImg = document.getElementById("dogImg")
let selfieClass = document.getElementById("selfieClass")

selfieClass.style.display = "none"
generateNames.style.display = "none"
backBtn.style.display = "none"

// Create indexedDB and database manipulation
let db;
const request = indexedDB.open("KhangDB");
request.onerror = (event) => {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
  console.error(`Database error: ${event.target.errorCode}`);
};
request.onsuccess = (event) => {
  db = event.target.result;
};






// Code for Love Calculator
function loveButtonClick(){
  loveCalculatorBtn.style.display = "none"  
  dogGeneratorBtn.style.display = "none"
  googleChartBtn.style.display = "none"  
  selfieBtn.style.display = "none"
  backBtn.style.display = "block"
  
  var name = prompt("Enter your name");
  var name2 = prompt("Enter your lover's name");

 const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4c5763135fmshf189e764cd19b6fp1e4719jsna73389341a58',
		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
	}
};

fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=' + name + '&fname=' + name2, options)
	.then(response => response.json())
	.then(response => {
    console.log(response)

    let percentage = response.percentage;
    let result = response.result;
    loveCalculatorResult.innerText = "Result: " + result + "\n Matching percentage: " +  percentage + "%";
  })
	.catch(err => console.error(err));

 }

// Code for generating random dog pics
function generateNamesOnClick(){
  
  fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((record) => {
         console.log(record)
        let source = record.message
        dogImg.src = source
        
        })
      .catch(err => alert(err))
}




function dogImgButton(){
  loveCalculatorBtn.style.display = "none"  
  dogGeneratorBtn.style.display = "none"
  googleChartBtn.style.display = "none"  
  selfieBtn.style.display = "none"
  backBtn.style.display = "block"
  generateNames.style.display = "block"

}

function googleChartButton(){
  loveCalculatorBtn.style.display = "none"  
  dogGeneratorBtn.style.display = "none"
  googleChartBtn.style.display = "none"  
  selfieBtn.style.display = "none"
  backBtn.style.display = "block"
}

function selfieButton(){
  loveCalculatorBtn.style.display = "none"  
  dogGeneratorBtn.style.display = "none"
  googleChartBtn.style.display = "none"  
  selfieBtn.style.display = "none"
  backBtn.style.display = "block"
  selfieClass.style.display = "block"

}

function backButton(){
  loveCalculatorBtn.style.display = "block"  
  dogGeneratorBtn.style.display = "block"
  googleChartBtn.style.display = "block"  
  selfieBtn.style.display = "block"
  backBtn.style.display = "none"
  loveCalculatorResult.innerText = ""
  dogImg.src = ""
  selfieClass.style.display = "none"

}

function callPirateAPI(){
  
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
   navigator.serviceWorker.register('../sw.js').then( () => {
    console.log('Service Worker Registered')
   })
    .catch(err=>{
      console.log('error in registration');
    })
 })
}

