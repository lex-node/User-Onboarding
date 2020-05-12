import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import axios from 'axios';

const Form = (props) => {

    /***************
     HOOKS
     ***************/

        //state hooks
    const [formState, setFormState] = useState({name: ``, email: ``, password: ``, terms: false});
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [errorState, setErrorState] = useState({name: ``, email: ``, password: ``, terms: false});
    const [usersState, setUsersState] = useState([]);
    //effect hooks
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setSubmitDisabled(!valid);
        });
    }, [formState]);

    /***************
     VALIDATION SCHEMA
     ***************/

    const formSchema = Yup.object().shape({
        email: Yup
            .string()
            .email("Must be a valid email address.")
            .required("Must include email address."),
        password: Yup
            .string()
            .min(6, "Passwords must be at least 6 characters long.")
            .required("Password is Required"),
        terms: Yup
            .boolean()
            .oneOf([true], "You must accept Terms and Conditions")
    });

    /***************
     EVENT HANDLERS
     ***************/

    const handleInput = (event) => {
        setFormState({...formState, [event.target.name]: event.target.value})
    }

    const handleCheckInput = (event) => {
        setFormState({...formState, [event.target.name]: !formState.terms})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`form submitted with ${formState.name} ${formState.email} ${formState.password} ${formState.terms}`);
        axios
            .post(`https://reqres.in/api/users`, formState)
            .then(res => {
                alert("success", res.data);
                setUsersState([...usersState, res.data]);
            })
            .catch(err => alert(err.response))
        setFormState({name: ``, email: ``, password: ``, terms: false});
    }

    /***************
     COMPONENT
     ***************/

    return (
        <div>
            <form style={{
                display: `flex`,
                flexDirection: `column`,
                justifyContent: `center`,
                alignContent: `center`,
                alignItems: `center`,
                margin: `20%`
            }} onSubmit={handleSubmit}>
                <input type={`text`} name={`name`} placeholder={`Name`} value={formState.name} onChange={handleInput}/>
                <input type={`text`} name={`email`} placeholder={`Email`} value={formState.email}
                       onChange={handleInput}/>
                <input type={`text`} name={`password`} placeholder={`Password`} value={formState.password}
                       onChange={handleInput}/>
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
                    <input type={`checkbox`} name={`terms`} value={formState.terms} onChange={handleCheckInput}/>
                </div>
                <button disabled={submitDisabled}>Submit!</button>
            </form>
            <pre>{JSON.stringify(usersState, null, 2)}</pre>
        </div>
    )
}

export default Form;
