import { Link, NavLink } from 'react-router-dom';

import '../Login/Login.css';

export const Register = () => {
    return (
        <div className="content__wrapper">
            <div className="appAside" />
            <div className="appForm">
                <div className="pageSwitcher">
                    <NavLink
                        to="/login"
                        activeClassName="pageSwitcherItem-active"
                        className="pageSwitcherItem"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        exact
                        to="/register"
                        activeClassName="pageSwitcherItem-active"
                        className="pageSwitcherItem"
                    >
                        Register
                    </NavLink>
                </div>
                <div className="formTitle">
                    <NavLink
                        to="/login"
                        activeClassName="formTitleLink-active"
                        className="formTitleLink"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        exact
                        to="/register"
                        activeClassName="formTitleLink-active"
                        className="formTitleLink"
                    >
                        Register
                    </NavLink>
                </div>
                <div className="formCenter">
                    <form className="formFields">
                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="formFieldInput"
                                placeholder="Enter your full name"
                                name="name"
                                defaultValue=""
                            />
                        </div>
                        <div className="formField">
                            <label
                                className="formFieldLabel"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
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
                                id="email"
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
                </div>
            </div>
        </div>
    );
};
