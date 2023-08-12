//Variable declarations
const inputE1 = document.getElementById("input"); //accesses the input ( place to enter words)
const infoTextE1 = document.getElementById("info-text");
const meaningContainerE1 = document.getElementById("meaning-container");
const titleE1 = document.getElementById("title");
const meaningE1 = document.getElementById("meaning");
const audioE1 = document.getElementById("audio");

//Function Definitions
//1.
async function fetchAPI(word) {
  try {
    infoTextE1.style.display = "block"; // shows the text message.. "searching the meaning..
    meaningContainerE1.style.display = "none"; //meaningcontainer not shown because api not run yet.

    infoTextE1.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    console.log(result);

    //AFTER RESULT OF API is fetched.Run the below CONDITION.
    //This condition shows what we want to see when word is bad = N/A not applicable and word is good.
    if (result.title) {
      meaningContainerE1.style.display = "block"; //shows Mcontainer
      infoTextE1.style.display = "none"; //dont want "searching the meaning of..." shown with Mcontainer
      titleE1.innerText = word;
      meaningE1.innerText = "N/A";
      audioE1.style.display = "none"; //dont want audio shown
    } else {
      infoTextE1.style.display = "none"; //dont want shown with Mcontainer
      meaningContainerE1.style.display = "block";
      audioE1.style.display = "inline-flex";
      titleE1.innerText = result[0].word;
      meaningE1.innerText = result[0].meanings[0].definitions[0].definition;
      audioE1.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextE1.innerText = `An error occured, please try again later`;
  }
}
//Event Listeners
//1.
inputE1.addEventListener("keyup", function (e) {
  console.log(e.target.value);
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});

/* COMMENTS 
FUNCTION DEFINITIONS
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



EVENT LISTENERS**********************************
1. INPUTE1...
This is an event listener for the input field
it listens for the 'keyup' event = when a key is pressed, this key will do something , e.g. just like a 'click' button
e.target.value = is the text inside the input box and it will show in inspect console.
e.key =  the specific key that was pressed when the event occurred in this case 'Enter' key
SO if there's something written on the(input box) and if the Enter key is pressed. 
and both conditions are met, then use the text on the input box to fetch data from an API.
THEN - we run the fetchAPI function.

2.




*/
