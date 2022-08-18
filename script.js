'use strick';
window.addEventListener('DOMContentLoaded', () => {

    const key = 'd96f9d59576d465eace134905210604';
    const form = document.querySelector('#seach');

    async function getWeatherByCityName(city){
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=4${city}&aqi=yes`;
        const resp = await fetch(url);
        const data = await resp.json();
        
        showSearchResults(data);
    }

    function showSearchResults(data){
        const info = document.querySelector('.info');
        info.innerHTML = 
        `
        <div class="info__city">${data.location.name} / ${data.location.country}</div>
        <div class="info__temp">${data.current.temp_c} &#8451;</div>
        <div class="info__icon"><img src="${data.current.condition.icon}"</div>
        `
    }

    async function deafultRegion(city = 'Kiev'){
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=4${city}&aqi=yes`;
        const resp = await fetch(url);
        const data = await resp.json();

        const current = document.querySelector('.current');
        current.innerHTML = 
        `
        <div class="title">You are current in: </div>
        <div class="current__city"> ${data.location.name} / ${data.location.country}</div>
        <div class="current__temp"> ${data.current.temp_c} &#8451;</div>
        <div class="current__icon"><img src="${data.current.condition.icon}"</div>
        `;

        return current;
    }

    deafultRegion();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputVal = form.querySelector('input[name="city"]').value;
        getWeatherByCityName(inputVal);
    })
});