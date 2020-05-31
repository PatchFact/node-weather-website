console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#msg1');
const messageTwo = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    messageOne.textContent = '';
    messageTwo.textContent = 'Fetching data...';

    const location = search.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {

                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});
