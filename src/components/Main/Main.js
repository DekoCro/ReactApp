import React from 'react';
import './main.css';

const Main = props => {
    return (
        <section>

            {/* weather box only if there is valid city */}
            {props.city ? 
            <div className="result-box" data-aos="zoom-in-right">
                <p className="results"><i className="fas fa-map-marker-alt location"></i> Location: {props.city},{props.country}</p>
                <p className="results"><i className="fas fa-temperature-low temp"></i> Temperature: {props.temp}°C</p>
                <p className="results"><i className="fas fa-wind wind"></i> Wind speed: {props.wind} km/h</p>
                <p className="results"><i className="fas fa-cloud cloud"></i> Forecast: {props.info}</p>
                <hr />
            </div>
            : ''}

            {/* error */}
            {props.error ? <p className="error"><i class="fas fa-exclamation-circle"></i> {props.error}</p> : ''}

            {/* event box only if there is valid city */}
            {props.city ?
            <div className="event-box" data-aos="fade-left">
                <h3>Upcoming event in {props.city}</h3>
                <p className="results">{props.event}</p>
                <p className="event-date">Date: {props.event_date}</p>
                <p className="event-info">{props.event_info}</p>
                <a href={props.event_url}>{props.event_url}</a>
            </div>
            : ''}
        </section>
    )
}

export default Main;