import React, { Fragment }from 'react';
import axios from 'axios'
import { swing } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

import './Weather.css';

class Weather extends React.Component {
  constructor(){
    super();
    this.state = {
      data : null,
      name : null,
      tempMin : null,
      tempMax : null,
      temp: null,
      icon : null,
      iconDescription : null,
      tempTomorrow: null,
      iconTomorrow : null,
      iconDescriptionTomorrow : null,
      tempAfter: null,
      iconAfter : null,
      iconDescriptionAfter : null,

      

    }
    this.apikey = "37abfa7b06aa97ac3af0cf7ed6679c73";
    this.now = new Date();
    this.date = this.now.getDate()
    this.annee = this.now.getFullYear();
    this.mois = this.now.getMonth() + 1;

    this.styles = {
      swing: {
        animation: 'x 4s',
        animationName: Radium.keyframes(swing, 'swing')
      }
    }  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&cnt=3&appid=${this.apikey}`)
      .then((response) => {
        console.log(response);
        this.setState({
          name : response.data.city.name,
          tempMin : response.data.list[0].main.temp_min,
          tempMax : response.data.list[0].main.temp_max,
          icon : response.data.list[0].weather[0].icon,
          temp : response.data.list[0].main.temp,
          iconDescription : response.data.list[0].weather[0].description,

          iconTomorrow : response.data.list[1].weather[0].icon,
          tempTomorrow : response.data.list[1].main.temp,
          iconDescriptionTomorrow : response.data.list[1].weather[0].description,

          iconAfter: response.data.list[2].weather[0].icon,
          tempAfter : response.data.list[2].main.temp,
          iconDescriptionAfter : response.data.list[2].weather[0].description,
        })
      })
    })
  }

  render(){
    return(
      <Fragment>
        
        <h1 className="title">WHAT'S THE<br/>WEATHER ?</h1>
        <div className="card">
          <p className="cityName">{this.state.name? this.state.name : " "}</p>
          <p className="date">{this.date}/{this.mois}/{this.annee}</p>
          <StyleRoot>
          <img className="imgWeather" style={this.styles.swing} src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt={this.state.iconDescription} />
          </StyleRoot>
          <p className="temparature">{this.state.temp? Math.floor(this.state.temp)+"°c" : <img className="loading" src={`${process.env.PUBLIC_URL}/assets/images/loading.gif`} /> }</p>
          <p className="trait">---------------</p>
          <p className="weatherDescription">{this.state.iconDescription}</p>
          <p className="tempMinMax">{this.state.tempMin? Math.floor(this.state.tempMin)+"°c" : " "} / {this.state.tempMax? Math.floor(this.state.tempMax)+"°c" : " "}</p>
        </div>
        <div className="cardNexDay">
          <div className="divtomorrow">
            <img className="imgWeatherTomorrow" src={`http://openweathermap.org/img/wn/${this.state.iconTomorrow}.png`} alt={this.state.iconDescriptionTomorrow}/>
            <p className="temparatureTomorrow">{this.state.tempTomorrow? Math.floor(this.state.tempTomorrow)+"°c" : " "}</p>
            <p className="tomorrow">Tomorrow</p>
          </div>
          <div>
            <img className="imgWeatherTomorrow" src={`http://openweathermap.org/img/wn/${this.state.iconAfter}.png`} alt={this.state.iconDescriptionTomorrow}/>
            <p className="temparatureTomorrow">{this.state.tempAfter? Math.floor(this.state.tempAfter)+"°c" : " "}</p>
            <p className="tomorrow">The Day After</p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Weather;
