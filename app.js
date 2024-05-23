//************ English Dictionary JS Functionality ************

//1.Variable declarations
const inputE1 = document.getElementById("input"); //accesses the input ( place to enter words)
const infoTextE1 = document.getElementById("info-text");
const meaningContainerE1 = document.getElementById("meaning-container");
const titleE1 = document.getElementById("title");
const meaningE1 = document.getElementById("meaning");
const audioE1 = document.getElementById("audio");

//Meaning Container = is container with the meaning text!
//Info-text = shown below the word input box "`Searching the meaning of "${word}"`;"
//"result[0].meanings[0].definitions[0]. - result[0] means the first element in the result array
//result[0].meanings[0].definitions[0]. = the 'meanings' is inside 'result' and 'definitions' is inside 'meanings'

//2.Function Definitions
//1.FetchAPI...
async function fetchAPI(word) {
  try {
    infoTextE1.style.display = "block"; // shows message= "searching the meaning..
    meaningContainerE1.style.display = "none"; //meaningcontainer not shown because api not run yet.
    infoTextE1.innerText = `Searching the meaning of "${word}"`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    console.log(result);

    //AFTER RESULT OF API is fetched.Run the below CONDITION.
    //This condition shows what we want to see when word is bad = N/A not applicable and word is good.
    //result.title = If API call contains a 'title' property. Means word not found in the dictionary,
    if (result.title) {
      infoTextE1.style.display = "none"; //dont want "searching the meaning of..." shown with Mcontainer
      meaningContainerE1.style.display = "block"; //shows Mcontainer
      titleE1.innerText = word;
      meaningE1.innerText = "N/A";
      audioE1.style.display = "none"; //dont want audio shown
    } else {
      infoTextE1.style.display = "none"; //dont want shown with Mcontainer
      meaningContainerE1.style.display = "block"; //SHOWS MContainer
      audioE1.style.display = "inline-flex"; //CSS
      titleE1.innerText = result[0].word; //1st word that comes
      meaningE1.innerText = result[0].meanings[0].definitions[0].definition;
      audioE1.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextE1.innerText = `An error occured, please try again later`;
  }
}
//3.Event Listeners
//1. INPUTE1...
inputE1.addEventListener("keyup", function (e) {
  console.log(e.target.value);
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});

//************ Dad Joke Generator JS Functionality ************

//1.VARIABLE DECLARATIONS...........................................
const btnE1 = document.getElementById("btnD"); //target button from index.HTML
const jokeE1 = document.getElementById("joke"); //Access the joke and show it in the container
const apikey = "5bcIRr65A05WwQt9jtcCIw==Ogx4vv8z1BM4ejnW"; //get from profile in apininjas.
const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";
const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apikey,
  },
};

//2.FUNCTION DEFINITIONS...............
// 1.Function getJoke()
async function getJoke() {
  try {
    jokeE1.innerText = "Relax Jokes are updating... "; //shows message before fetching api jokes
    btnE1.disabled = true; //disables the button so that joke can load
    btnE1.innerText = "Loading...."; //message which appears on the button

    const response = await fetch(apiURL, options).then((res) => res.json());
    console.log(response); // shows joke in console
    //After API is fetched and above code is finished running:

    jokeE1.innerText = response[0].joke; //shows joke INSIDE container,[0]=gets first joke in data array
    btnE1.disabled = false; //removes disabled button allowing button to be pressed again
    btnE1.innerText = "Tell me a joke ...."; //message which appears on the button
  } catch (error) {
    jokeE1.innerText = "Error happened, try again later";
    console.log(error);
  }
}

//3.EVENT LISTENERS..............
btnE1.addEventListener("click", getJoke);

//************ Random Quote Generator JS Functionality ************
//1.Variuable Definitions
const quoteE1 = document.getElementById("quote"); //Access the quote and show it in the container
const btnRQE1 = document.getElementById("btnRQ"); //target button from index.HTML
const authorContainerE1 = document.getElementById("author-container");
const authorE1 = document.getElementById("author");
const categoryE1 = document.getElementById("category");
const apiKeyRQ = "5bcIRr65A05WwQt9jtcCIw==Ogx4vv8z1BM4ejnW"; //get from profile in apininjas.
const apiurlRQ = "https://api.api-ninjas.com/v1/quotes?category=";
const optionsRQ = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKeyRQ,
  },
};

//2.Function Definitions
async function getquote() {
  try {
    //WHAT YOU WANT TO SEE BEFORE FETCHING API
    authorContainerE1.style.display = "none"; //dont want to see authorcontainer

    quoteE1.innerText = "Relax quotes are updating... "; //shows message before fetching api quotes
    btnRQE1.disabled = true; //disables the button so that quote can load
    btnRQE1.innerText = "Loading...."; //message which appears on the button

    const resultRQ = await fetch(apiurlRQ, optionsRQ).then((res) => res.json());
    console.log(resultRQ); // shows quote in console

    //WHAT YOU WANT TO SEE AFTER FETCHING API:

    quoteE1.innerText = resultRQ[0].quote; //shows quote INSIDE container,[0]=gets first quote in data array
    authorContainerE1.style.display = "block";
    authorE1.innerText = resultRQ[0].author; //shows author name
    categoryE1.innerText = resultRQ[0].category; // shows category
    btnRQE1.disabled = false; //removes disabled button allowing button to be pressed again
    btnRQE1.innerText = "I want a quote ...."; //message which appears on the button
  } catch (error) {
    quoteE1.innerText = "Error happened, try again later";
    console.log(error);
  }
}

//3.Event listeners
//EVENT LISTENERS..............
btnRQE1.addEventListener("click", getquote);

/**************************   BMI Index calculator    ****************** */
//1.Variable declarations
const calcBMI = document.getElementById("calculateBtn"); //target button from index.HTML
const yourBMI = document.getElementById("inputbmi");
const weightCD = document.getElementById("weightcd"); //weight condition text

//2.Function Definitions
//Before Data display.
/*height and weight value inside, so that when the button is clicked, 
most recent user inputs are calulated and 
not initial values which come when page loads.
*/
function getBMI() {
  try {
    const heightValue = document.getElementById("heightV").value / 100;
    const weightValue = document.getElementById("weightV").value;

    const bmiValue = weightValue / (heightValue * heightValue);

    console.log(bmiValue); // shows height and weight value in console

    yourBMI.value = bmiValue; // shows value in inputbox 'Your BMI'

    if (bmiValue < 18.5) {
      weightCD.innerText = "Underweight";
    } else if (bmiValue <= 25.0) {
      weightCD.innerText = "Healthy weight";
    } else if (bmiValue >= 25.0 && bmiValue < 29.0) {
      weightCD.innerText = "Overweight";
    } else {
      weightCD.innerText = "Obese";
    }
  } catch (error) {
    //quoteE1.innerText = "Error happened, try again later";
    console.log(error);
  }
}

//Fetch Data

//After Data display:

//3.EVENT LISTENERS..............
calcBMI.addEventListener("click", getBMI);

//************ Feedback EMOJI RATINGS  Functionality ************

//1.VARIABLE DECLARATIONS...........................................
const sendReviewBtnEl = document.getElementById("btnSR"); //target button from index.HTML
const ratingsEls = document.querySelectorAll(".rating"); //Access all the classes with name of rating
const containerEl = document.getElementById("containerEmoji"); //accesses the container
let selectedRating = ""; //selectedRating value is an empty string

//2.FUNCTION DEFINITIONS................................................
function removeActive() {
  ratingsEls.forEach(function (ratingE1) {
    ratingE1.classList.remove("active");
  });
}

//3.EVENT LISTENERS.......................................................
ratingsEls.forEach(function (ratingE1) {
  ratingE1.addEventListener("click", function (e) {
    removeActive();
    selectedRating = e.target.innerText || e.target.parentNode.innerText;
    e.target.classList.add("active");
    e.target.parentNode.classList.add("active");
  });
});

sendReviewBtnEl.addEventListener("click", function (e) {
  if (selectedRating !== "") {
    containerEl.innerHTML = `
        <strong class= "greeting1" > Thanks for taking part in the review </strong>
        <br>
        <br>
        <strong> Feedback: ${selectedRating} </strong> 
        <p> We'll use your feedback to support our work, thanks :)</p>
        `;
  }
});

/*
 *****************   COMMENTS for English Dicttionary    **********************

 /* COMMENTS 
links 
dictionary api website
https://dictionaryapi.dev/


 ************ FUNCTION DEFINITIONS  ************ 
1.fetchAPI

fetchAPI is getting the URL. The Result is fetching the url and 'then' waiting for the response (res)
and converting the response in json. Then logs the result in inspect console. YOU can click the word
'promise' >array>0 you will see (word = car e.g.)>meanings>0>definitions - you will see the meaning
of that word.

AWAIT = always use "await" when fetching data from API. we use 'await' because we want the result code to run first
and finish before moving onto the next task or function otherwise we will get error.
When we use "await" we want to change our function to "async" asynchronous function otherwise we will get error.

TRY AND CATCH = always use "try and catch" to get possible errors from API request

infoTextE1.innerText= provides inside text message
 infoTextE1.style.display = "block"; makes the text inside visible 
infoTextE1.style.display = "none"; - is a CSS style change, it hides the text from being displayed on 
the webpage once the API call and data processing are complete.

meaningContainerE1.style.display = "block"; = it shows after the result of fetching the API

titleE1.innerText = result[0].word; = retrieves the first word in the array which is next to the 'word:'
which is the title 'job'

meaningE1.innerText = result[0].meanings[0].definitions[0].definition; THIS is accessing data from the 
result variable, which seems to be an object obtained from an API response. 
It's navigating through the nested structure of this object to retrieve the value of the definition property.

IF and ELSE statement
(result.title)): This checks if there's a property called title in the result object. 
If this property exists and is not empty, it means that the word is considered "bad". 
In this case, the word's meaning might not be applicable or might not be available.



 ************ EVENT LISTENERS  ************ 
1. INPUTE1...
This is an event listener for the input field
it listens for the 'keyup' event = when a key is pressed, this key will do something , e.g. just like a 'click' button
e.target.value = is the text inside the input box and it will show in inspect console.
e.key =  the specific key that was pressed when the event occurred in this case 'Enter' key
SO if there's something written on the(input box) and if the Enter key is pressed. 
and both conditions are met, then use the text on the input box to fetch data from an API.
THEN - we run the fetchAPI function.








 *****************   COMMENTS for Dad Joke Generator    **********************

//1.VARIABLE DECLARATIONS - all functionality here, buttons etc..........
const apikey = 
const apiURL = Get API URL from 'sample request url' -in ninjas, so it can be checked 
const options = //5.Add apikey inside headers to get the jokes,use info below to get the jokes
//only add the 'apikey' word below into the headers part 


//2.FUNCTION DEFINITIONS
/* getJoke function fetches a joke from the API
First: sends a request to get the apiURL and options
2nd: waits for that response before moving to the next line.
await = always use await when getting APIs, used to wait for the api and options to be fetched before moving onto next task
async= always used when we use 'await'

3rd:It waits again to understand joke then converts response into called JSON format
4th:prints joke on console printing it on the console so that you can see and enjoy the joke.

can use this INSIDE FUNCTION to show jokes in console .console.log(data[0].joke);//shows joke in browser console


//2.EVENT LISTENERS:  /*click this button want to trigger the function 'getJoke'.
This will get the joke when we call it 

HOW TO GET THE API.......................

Use API ninjas to get Dadjokes into our webapp its free and has many,
signup
profile - click show api key and copy the key 
go to whatever api you want e.g. dad jokes
go to code examples
click javascript
copy '   headers: { 'X-Api-Key': 'YOUR_API_KEY'},
now enter this key in section "YOUR API.." LIKE ABOVE






 *****************   COMMENTS for feedback UI    **********************



************ VARIABLE DECLARATIONS *******************
1. selectedRating
selectedRating is initialized as an empty string ("") 
so that it has a value to start with, even before a user selects a rating.
common practice in programming, especially when you want to 
store a value that will be updated based on user interactions.


 ************ FUNCTION DEFINITIONS *******************
1.remove Active
removes the 'active' from other ratings, when one is clicked 
e.g. removes green shadow from emoji
It ensures that only one rating can be active at a time.



************ EVENT LISTENERS *******************
1.ratingE1.addEventListener
Allows access to all 3 ratings emojis ,attaches a "click" event listener to each 
rating element using forEach loop.
removeActive = this function removes the "active" class from all the emoji ratings elements


selectedRating = used to keep track of the rating emoji that is currently selected.
e.target.innerText || e.target.parentNode.innerText = 
The selectedRating can either be 2 options
The innerText =meaning it gets the text inside that emoji rating or 
parentNode = meaning it gets the text from the container around that emoji.

classlist means = accessing the classes of that element. 
e.g. classlist of emoji element in e.targetclassList.

etargetclassList = visually adds the "active" class, indicating that the emoji rating is selected or highlighted.
etargetparentNode= visually adds the "active" class to the parent element ensures that 
the background color of parent element (container) remains active along with the selectedRating.

2.sendReviewBtnEl
selectedRating !== ""
If a user hasn't selected any emoji rating 
(meaning the selectedRating is still an empty string), 
the content won't change when the button is clicked. 
If a rating has been selected (meaning selectedRating is something 
other than an empty string), 
the content on the page will change according to the chosen rating.
Template literals to show selectedRating is equal to whatever rating is clicked.



active - is like hover effect , it makes sure when rating is clicked 
the hover stays and does not disappear when you click away

 parents is the container:
child is the emoji inside the divbox
 1.Line was removed from ratingsEls. function:
    console.log(e.target.innerText || e.target.parentNode.innerText);
console.log(e.target.innerText); - shows ratings in console when CLICKED OUTSIDE the box, happy,angry satisfied

/*code above adds click event to "send review" button
1st. rating(emoji) is selected then send review buton is clicked 
This then shows the other side of the container we add an "inner.html" with a 
 greeting message.

*/
