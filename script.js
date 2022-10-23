const search= document.getElementById("search");
const city= document.getElementById("main_city");
let cityName="pune"
const APIKey= "b6b43c524a8dee9ecb410aa154a734ee";
const weatherData=document.getElementById("data");
const deniedLocation=document.getElementById("denied");
const temp = document.getElementById("temp");
const humid = document.getElementById("humidity");
const wind = document.getElementById("wind");
const image = document.getElementById("main_img");
const sky = document.getElementById("sky");
const rude = document.getElementById("rudemsg");

let flag = true;



function output(fetchedData){
    temp.innerHTML=`${Math.round(parseFloat(fetchedData.main.temp))}<sup>&deg;C</sup>`

    humid.textContent = `${Math.round(parseFloat(fetchedData.main.humidity))}%`

    wind.textContent = `${Math.round(parseFloat(fetchedData.wind.speed))}Km/h`

    let icon = fetchedData.weather[0].icon

    if (icon==="50n" ||icon==="50d") {
        image.src = "./img/mist.png"
    }
    else if (icon==="01n"){
        image.src = "./img/clear.png"
    }
    else if (icon === "02n" || icon === "03n"||icon === "04n" || icon === "02d"||icon === "04d" ||icon === "03d" ){
        image.src = "./img/cloud.png"
    }
    else if (icon === "09n" ||icon === "10n" ||icon === "11n" || icon === "09d"|| icon === "11d"||icon === "10d"){
        image.src = "./img/rain.png"
    }
    else{
        image.src = "./img/snow.png"

    }
    

    sky.textContent=`${fetchedData.weather[0].description}`
}

const cityCurrentData = async ()=>{


    const response_city=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName} &appid=${APIKey}&units=metric`)

    
    if(!response_city.ok){
        console.log("error")
        flag = 0
    }
    else{
        console.log("api running")
        flag= 1
        return response_city.json();
    }
}

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
 
    }

}
async function showPosition(position){

    weatherData.style.display="flex";
    deniedLocation.style.display="none";

    const fetchedData =await locationCurrentData(position.coords.latitude.toFixed(2),position.coords.longitude.toFixed(2));


    output(fetchedData);
}




function showError(error){
    if(error.PERMISSION_DENIED){
        
        weatherData.style.display="none";
        deniedLocation.style.display="block";
        rude.textContent="You denied my request now search through city"

    }
};

const locationCurrentData = async(lat, lon)=>{

    const response_location=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`)

    if(!response_location.ok){
        console.log("error")
    }
    else{
        console.log("api running")
        return await response_location.json()
    }  
}

search.addEventListener("click",async ()=>{

    cityName=city.value

    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1)

    const fetchedData = await cityCurrentData()
    
    if (flag===1){
        output(fetchedData);
        weatherData.style.display="flex";
        deniedLocation.style.display="none";
        

    }
    else{
        weatherData.style.display="none";
        deniedLocation.style.display="block";
        rude.textContent="You can't even write a city name? shame on you"
        
    }

})

city.addEventListener("input",()=>{

    if (city.value==="" || city.value===null){
        
        getlocation();
    }
})

// let cities=[]

// for (let i in data){
//     cities.push(data[i].name);
// }


getlocation();





