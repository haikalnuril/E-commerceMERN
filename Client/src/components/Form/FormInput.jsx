import React from "react";

const FormInput = (props) => {
    const { label, name, type, defaultValue } = props;
    return (
        <label className="form-control">
            <label className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                className="input input-bordered"
            />
        </label>
    );
};

export default FormInput;
