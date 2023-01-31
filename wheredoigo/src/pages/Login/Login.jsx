import { Link, NavLink } from 'react-router-dom';
import './Login.css';

export const Login = () => {
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
                            <button className="formFieldButton">Login</button>
                            <Link to="/register" className="formFieldLink">
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
