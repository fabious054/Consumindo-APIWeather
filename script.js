document.querySelector('.busca').addEventListener('submit', async(event)=>{
    event.preventDefault();

    let input = document.getElementById('searchInput').value;

    if (input !== ''){

        showWarning('carregando');
        
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9a45ede755c5bbdc97f211a8cae4e0e4&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();
            
        if(json.cod === 200){

        showInfo({
            name: json.name,
            country: json.sys.country,
            temperatura: json.main.temp,
            tempIcon : json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
            }
       )
        } else {
            
            document.getElementById('resultado').style.display = 'none';
            showWarning('SEM RESULTADOS PARA ESTA PESQUISA')
        };   
}
});

function showInfo(json){

    showWarning('');
    
    document.getElementById('resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name} - ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temperatura} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

};

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
};

