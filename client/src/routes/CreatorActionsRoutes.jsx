import { Routes, Route } from 'react-router-dom';
import routeConstants from '../constants/routeConstants';

import { AddPlace } from '../pages/AddPlace/AddPlace';
import { EditDestination } from '../pages/EditDestination/EditDestination';
import { EditPlace } from '../pages/EditPlace/EditPlace';
import NotFound from '../components/Errors/NotFound/NotFound';

const { DESTINATIONS, PLACES } = routeConstants;

const CreatorActionsRoutes = () => {
    return (
        <Routes>
            <Route path={PLACES.EDIT.route} element={<EditPlace />} />
            <Route path={PLACES.ADD.route} element={<AddPlace />} />
            <Route path={DESTINATIONS.EDIT.route} element={<EditDestination />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default CreatorActionsRoutes;
