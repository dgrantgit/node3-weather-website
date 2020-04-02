const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('p#weather_title');
const messageTwo = document.querySelector('p#weather_message');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchElement.value;
    if(!location){
        messageOne.textContent = "Error";
        messageTwo.textContent = "Please provide a proper location";
        return "";
    }

    messageOne.textContent = "loading...";
    messageTwo.textContent = "";
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = "Error!"
                messageTwo.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })    
    })
})