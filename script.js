
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
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat_lon[0]}&lon=${lat_lon[1]}&appid=4deb99a573d3084988da2f4740e4bea1`)
    let json = await response.json();
    console.log(json);
}



let city = prompt('what is the city');

getCityWeather(city);