import { NavLink } from 'react-router-dom';

export const Link = ({ children, to: link, className }) => {
    return (
        <li>
            <NavLink to={link} className={className ? className : ''}>
                {children}
            </NavLink>
        </li>
    );
};
