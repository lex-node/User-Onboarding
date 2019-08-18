import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({values, errors, touched, isSubmitting, status}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div>
            <div className="container">
            <h1>USERS</h1>
            {
                users.map(user => {
                    return (<div className="card">
                            <h1>{user.name}</h1>
                            <li>Name: {user.name}</li>
                            <li>Email: {user.email}</li>
                        </div>
                    )
                })
            }
            </div>
            <Form>
                <div>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                    <Field type="name" name="name" placeholder="Name"/>
                </div>
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type="email" name="email" placeholder="Email"/>
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password"/>
                </div>
                <label>
                    <Field type="checkbox" name="tos" checked={values.tos}/>
                    Accept TOS
                </label>
                <button disabled={isSubmitting}>Submit</button>
            </Form>
        </div>
    );
}

const FormikForm = withFormik({


    mapPropsToValues({name, email, password, tos, meal}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(16, "Password must be 16 characters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, {resetForm, setStatus, setSubmitting}) {

        axios
            .post("https://reqres.in/api/users_", values)
            .then(res => {
                console.log(res.data); // Data was created successfully and logs to console
                setStatus(res.data);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
                setSubmitting(false);
            });

    }
})(LoginForm);

export default FormikForm;


