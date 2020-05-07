import React from 'react';

const Form = (props) => {

    return (
        <form style={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignContent: `center`,
            alignItems: `center`,
            margin: `20%`
        }}>
            <input type={`text`} name={`name`} placeholder={`Name`}/>
            <input type={`text`} name={`email`} placeholder={`Email`}/>
            <input type={`text`} name={`password`} placeholder={`Password`}/>
            <div style={{
                border: `solid`,
                display: `flex`,
                flexDirection: `column`,
                justifyContent: `center`,
                alignContent: `center`,
                alignItems: `center`,
                width: `31%`
            }}>
                Agree to terms?
                <input type={`checkbox`} name={`terms`}/>
            </div>
            <button>Submit!</button>
        </form>
    )
}

export default Form;
