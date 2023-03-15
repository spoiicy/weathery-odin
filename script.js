
let getLatLong = async (url) =>{
    let response = await fetch(url);
    let json = await response.json();
    
    let lat_lon = [];
    lat_lon.push(json[0].lat);
    lat_lon.push(json[0].lon);

    return lat_lon;
    
}


let getCityWeather = async(city) =>{
    let lat_lon = await getLatLong(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=4deb99a573d3084988da2f4740e4bea1`);
    // console.log(lat_lon);
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat_lon[0]}&lon=${lat_lon[1]}&appid=4deb99a573d3084988da2f4740e4bea1&units=metric`)
    let json = await response.json();
    console.log(json);
    let cityWeather = {
        city_name:json.name,
        temp:json.main.temp,
        weather:[json.weather[0].main,json.weather[0].icon]
    }

    console.log(cityWeather);
    return cityWeather;
}


function fillCard(weatherData) {
    const card = document.querySelector('.card');
    let city_name = document.createElement('div');
    city_name.textContent = weatherData.city_name;
    city_name.classList.add('city_name');
    card.appendChild(city_name);
    
    let temp = document.createElement('div');
    temp.textContent = weatherData.temp+'\u2103';
    temp.classList.add('temp');
    card.appendChild(temp);

    let weather = document.createElement('div');
    weather.textContent = weatherData.weather[0];
    weather.classList.add('weather');
    card.appendChild(weather);

    let icon = document.createElement('img');
    let icon_png = weatherData.weather[1];
    icon.src = `https://openweathermap.org/img/wn/${icon_png}@2x.png`;
    card.appendChild(icon);

};


const submit_btn = document.querySelector('button');
submit_btn.addEventListener('click',async ()=>{
    let card = document.querySelector('.card');
    card.textContent = "";
    card.classList.remove('not-active');
    let city = document.querySelector('#city_name').value;
    let weatherData = await getCityWeather(city);
    fillCard(weatherData);
})
