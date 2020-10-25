//DOM
const time = document.querySelector(".time"),
    name = document.querySelector(".name"),
    greeting = document.querySelector(".greeting"),
    focus = document.querySelector(".focus"),
    fullDate = document.querySelector(".date");
//SHOW Time

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        minute = today.getMinutes(),
        second = today.getSeconds();

    //output time
    time.innerHTML = `${hour}<span>:</span>${addZero(minute)}<span>:</span>${addZero(second)}`;

    setTimeout(showTime, 1000)
}
// SHOW DATE
function showDate() {
    let today = new Date(),
        month = today.getMonth(),
        date = today.getDate(),
        day = today.getDay();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const fullMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];

    for (let i = 0; i < dayOfWeek.length; i++) {
        for (let j = 0; j < fullMonth.length; j++) {
            fullDate.innerHTML = `${dayOfWeek[day]}, ${date} ${fullMonth[month]}`;
        }
    }
}


//add ZERO
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// set BACKGROUND AND GREETING
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        document.body.style.backgroundImage = "url('assets/images/night/01.jpg')";
        greeting.textContent = 'Good Night!';
    } else if (hour < 12) {
        document.body.style.backgroundImage = "url('assets/images/morning/01.jpg')";
        greeting.textContent = "Good Morning!";
    } else if (hour < 18) {
        document.body.style.backgroundImage = "url('assets/images/day/01.jpg')";
        greeting.textContent = "Good Day!";
    } else {
        document.body.style.backgroundImage = "url('assets/images/evening/01.jpg')";
        greeting.textContent = "Good Evening!";
        document.body.style.color = 'white';

    }
}
// get NAME
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]'
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}
//SET NAME
function setName(e) {
    if (e.type === "keypress") {
        if (e.which === 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur()
        }

    } else {
        localStorage.setItem('name', e.target.innerText)
    }
}
//set FOCUS
function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}


focus.onclick = function () {
    this.textContent = '';
}
focus.onblur = function () {
    if (this.textContent == '') {
        this.textContent = '[Enter Focus]';
    } else {
        this.textContent = focus.textContent;
    }
}

name.onclick = function () {
    this.textContent = '';
}
name.onblur = function () {
    if (this.textContent == '') {
        name.textContent = '[Enter Name]';
    } else {
        this.textContent = name.textContent;
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
//RUN
showTime();
setBgGreet();
getName();
getFocus();
showDate();

// Change IMAGES
let base = 'assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}
function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;
}
function changeImage() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        base += 'night/';
    } else if (hour < 12) {
        base += 'morning/'
    } else if (hour < 18) {
        base += 'day/'
    } else {
        base += 'evening/';
    }

    const imageHourSrc = base + images[(hour % 6)];
    viewBgImage(imageHourSrc);
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);
changeImage();

// Change QUOTES

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');

async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

//WEATHER

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=723a1000d95e1f09b7cb7c0c178512c0&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
  function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }

  getWeather()

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);