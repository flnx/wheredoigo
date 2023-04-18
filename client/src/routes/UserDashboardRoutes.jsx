import { Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard/Dashboard';
import { MyTrips } from '../pages/Dashboard/components/MyTrips/MyTrips';
import { UserSettings } from '../pages/Dashboard/components/UserSettings/UserSettings';
import { Followers } from '../pages/Dashboard/components/Followers/Followers';
import { Logout } from '../components/Logout/Logout';
import { History } from '../pages/Dashboard/components/History/History';
import { AddDestination } from '../pages/Dashboard/components/AddDestination/AddDestination';

const UserDashboardRoutes = () => {
    return (
        <Routes>
            <Route element={<Dashboard />}>
                <Route index element={<p>Hello, Friend</p>}/>
                <Route path="add" element={<AddDestination />} />
                <Route path="destinations-created-by-user" element={<MyTrips />} />
                <Route path="history" element={<History />} />
                <Route path="settings" element={<UserSettings />} />
                <Route path="followers" element={<Followers />} />
                <Route path="logout" element={<Logout />} />
            </Route>
        </Routes>
    );
};

export default UserDashboardRoutes;
