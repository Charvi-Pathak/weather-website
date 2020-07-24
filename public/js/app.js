// console.log('Client side JS file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then(data => {
//         console.log(data);
//     });
// })

// fetch('http://localhost:3000/weather?address=!').then((res) => {
//     res.json().then(data => {
//         console.log(data);
//     });
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msgOne.textContent = 'loading..'
    msgTwo.textContent = '';
    const location = search.value;
    const url = '/weather?address=' + location;

    fetch(url).then((res) => {
        res.json().then(data => {
            console.log(data);
            if (data.error) {
                msgOne.textContent = data.error;

            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }

        });
    })
});