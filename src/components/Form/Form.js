import React from 'react';
import './form.css';

const Form = props => {
    return (
        <section>
            <form onSubmit={props.getWeather}>
                <input type="text" name="city" placeholder="Search for city..." />
                <input type="text" name="country" placeholder="Search for country..." />
                <button>Search</button>
            </form>
        </section>
    )
}

export default Form;