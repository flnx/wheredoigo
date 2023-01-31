import { NavLink } from 'react-router-dom';
import './Login.css';

export const FormLayout = ({ page: Page }) => {
    return (
        <div className="content__wrapper">
            <div className="appAside" />
            <div className="appForm">
                <div className="pageSwitcher">
                    <NavLink to="/login" className="pageSwitcherItem">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="pageSwitcherItem">
                        Register
                    </NavLink>
                </div>
                <div className="formTitle">
                    <NavLink to="/login" className="formTitleLink">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="formTitleLink">
                        Register
                    </NavLink>
                </div>
                <div className="formCenter">
                    <Page />
                </div>
            </div>
        </div>
    );
};
