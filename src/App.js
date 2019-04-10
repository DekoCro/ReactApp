import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

export default class App extends React.Component {
  state = {
    temp: null,
    city: null,
    country: null,
    wind: null,
    info: null,
    event: null,
    event_url: null,
    event_info: null,
    event_date: null,
    error: ''
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    // unique api key stored in variable later used in api
    const API_KEY = '4976eafaf6a320c51de0ee5be26e3c0a';

    // constant that takes fucntion which makes the api call
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);

    // whatever we get back from 'const api_call' will be converted to json()
    const data = await api_call.json();

    // if city and counrty value exist it will return us this new state
    if(city && country) {
      console.log(data);
      this.setState({
        temp: data.main .temp,
        city: data.name,
        country: data.sys.country,
        wind: data.wind.speed,
        info: data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
        ...this.state,
        error: "Enter the city and the country"
      })
    }
    this.getEvent();
  }

  getEvent = async () => {
    // unique api key stored in variable later used in api
    const API_KEY = '2ESSSIDKBI5KM4VX46FM';
    // proxyurl variable to remove the CRUD protection
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const api_call = await fetch(`${proxyurl}https://www.eventbriteapi.com/v3/events/search?location.address=${this.state.city}&location.within=10km&expand=venue&token=${API_KEY}`);

    // whatever we get back from 'const api_call' will be converted to json()
    const data = await api_call.json();
    console.log(data);

    if(this.state.city) {
      this.setState({
        ...this.state,
        event: data.events[0].name.html,
        event_url: data.events[0].url,
        event_info : data.events[0].description.text,
        event_date : data.events[0].start.local
      })
    }
  }

  render() {
    return (
      <div className="app-box">
        <Header />
        <Form 
        getWeather={this.getWeather}
        />
        <Main 
        temp={this.state.temp}
        city={this.state.city}
        country={this.state.country}
        wind={this.state.wind}
        info={this.state.info}
        error={this.state.error}
        event={this.state.event}
        event_url={this.state.event_url}
        event_info={this.state.event_info}
        event_date={this.state.event_date}
        />
        <Footer />
      </div>
      )
  }
}


