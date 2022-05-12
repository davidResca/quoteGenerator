const $quoteContainer = document.querySelector('#quote-container');
const $quoteText = document.querySelector('#quote');
const $authorText = document.querySelector('#author');
const $twitterBtn = document.querySelector('#twitter');
const $newQuoteBtn = document.querySelector('#new-quote');
const $loader = document.querySelector('#loader');

let apiQuotes = [];


function showLoadingSpinner() {
    $loader.hidden = false;
    $quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    $quoteContainer.hidden = false;
    $loader.hidden = true;
}

//Obtener data de la API.
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        getQuotes();
        // Agarrar (catch) errores acá.
    }
}

// Funcion mostrar nueva frase.
function newQuote() {
    showLoadingSpinner();
    // Elegir una frase aleatoria desde array apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // chequear si el autor existe y si no colocar 'unkown'
    if(!quote.author) {
        $authorText.textContent = 'Unknown';
    } else {
        $authorText.textContent = quote.author;
    }
    //chequear el largo de la frase para determinar el estilo.
    if(quote.text.length > 120) {
        $quoteText.classList.add('long-quote');
    } else {
        $quoteText.classList.remove('long-quote');
    }    
    // set quote, hide loader.
    $quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Twitear frase
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${$quoteText.textContent} - ${$authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//declarar la función antes de llamarla ;)
$newQuoteBtn.addEventListener('click', newQuote);
$twitterBtn.addEventListener('click', tweetQuote);

// Carga
getQuotes(); 



// EXPLICACION //

// Obtener las frases desde la API
/* Para hacer esto vamos a usar una solicitud de recuperacion
asincrónica dentro de la instrucción try/catch. 

Qué quiere decir esto? => una función asincrónica puede correr 
en cualquier momento de forma independiente y no hará que el 
navegador detenga la carga de la página */

/* try catch nos permite intentar completar una fetch request,
y si no funciona podemos "atrapar" la información del error 
y hacer algo con ella.
*/

/* 
const response = await fetch(apiUrl) => Esto significa que la 
constante no será poblada hasta que tenga alguna información
proveniente (fetched) de la API. Esto significa por default: si no 
no hacíamos asincronía y tampoco el await, el programa intentaría
setear el valor de la constante response antes de tener la 
posibilidad de obtener la información del fetch y eso ocasionaría 
un error. 
En este caso setearemos el valor de la constante response
cuando realmente TENEMOS la información y puede ser asignada
a response.  
*/

/* 
Obtenemos el JSON desde la API como respuesta y convertimos
esa respuesta en un objeto JSON porque es una serie de strings
y luego lo pasaremos dentro de una variable global "apiQuotes".
*/
