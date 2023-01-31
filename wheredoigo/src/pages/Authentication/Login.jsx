import { Link, NavLink } from 'react-router-dom';
import './Login.css';

export const Login = () => {
    return (
        <form className="formFields">
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
                <button className="formFieldButton">Login</button>
                <Link to="/register" className="formFieldLink">
                    Create an account
                </Link>
            </div>
        </form>
    );
};
