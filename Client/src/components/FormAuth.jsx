import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";

const FormAuth = (props) => {
    const { isRegister } = props;
    return (
        <div className="h-screen grid place-items-center">
            <Form
                method="POST"
                className="card w-96 p-8 bg-base-300 shadow-lg flex flex-cols gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">{isRegister ? "Register" : "Login"}</h4>
                {
                    isRegister ? (
                        <FormInput label="name" name="name" type="text" />
                    ) : null
                }
                <FormInput label="email" name="email" type="email" />
                <FormInput label="password" name="password" type="password" />
                <div>
                    <button
                        className="btn btn-primary btn-block "
                        type="submit"
                    >{isRegister ? "Register" : "Login"}</button>
                </div>
                <p className="text-center">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}
                    <Link
                        to={isRegister ? "/login" : "/register"}
                        className="text-accent ml-2 link link-hover capitalize"
                    >
                        {isRegister ? "Login" : "Register"}
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default FormAuth;
