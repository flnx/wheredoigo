import { ButtonLinkPrimary } from 'src/components/Buttons/Primary-Btn/LinkButtonPrimary';

import routeConstants from 'src/constants/routeConstants';
const { AUTH } = routeConstants;

export const UnauthenticatedRoutesLinks = () => {
    return (
        <>
            <li>
                <ButtonLinkPrimary to={AUTH.LOGIN.routePath}>
                    {AUTH.LOGIN.name}
                </ButtonLinkPrimary>
            </li>
            <li>
                <ButtonLinkPrimary to={AUTH.REGISTER.routePath}>
                    {AUTH.REGISTER.name}
                </ButtonLinkPrimary>
            </li>
        </>
    );
};
