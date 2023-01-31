import { Link, NavLink } from 'react-router-dom';

import './Login.css';

export const Register = () => {
    return (
        <form className="formFields">
            <div className="formField">
                <label className="formFieldLabel" htmlFor="name">
                    Full Name
                </label>
                <input
                    type="text"
                    className="formFieldInput"
                    placeholder="Enter your full name"
                    name="name"
                    defaultValue=""
                />
            </div>
            <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    className="formFieldInput"
                    placeholder="Enter your password"
                    name="password"
                    defaultValue=""
                />
            </div>
            <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                    E-Mail Address
                </label>
                <input
                    type="email"
                    className="formFieldInput"
                    placeholder="Enter your email"
                    name="email"
                    defaultValue=""
                />
            </div>

            <div className="formField">
                <label className="formFieldCheckboxLabel">
                    <input
                        className="formFieldCheckbox"
                        type="checkbox"
                        name="hasAgreed"
                        defaultValue=""
                    />
                    I agree all statements in
                    <a href="null" className="formFieldTermsLink">
                        terms of service
                    </a>
                </label>
            </div>

            <div className="formField">
                <button className="formFieldButton">Register</button>
                <Link to="/login" className="formFieldLink">
                    I'm already member
                </Link>
            </div>
        </form>
    );
};
