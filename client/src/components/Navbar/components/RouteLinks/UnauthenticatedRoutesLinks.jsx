import { ButtonLinkPrimary } from 'src/components/Buttons/Primary-Btn/LinkButtonPrimary';
import { LinkButtonSecondary } from 'src/components/Buttons/Secondary-Btn/LinkButtonSecondary';

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
            <li>
                <LinkButtonSecondary to={AUTH.REGISTER.routePath}>
                    Guest login
                </LinkButtonSecondary>
            </li>
        </>
    );
};
