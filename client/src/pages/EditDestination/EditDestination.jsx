import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';

export const EditDestination = () => {
    const navigate = useNavigate();
    const { state: destinationId } = useLocation();
    const destination = destinationId ? useRequestEditDestinationPermissions(destinationId) : null;

    useEffect(() => {
        if (!destinationId) {
            navigate('/dashboard/destinations-created-by-user', { replace: true });
        }
    }, []);

    if (!destinationId) return;

    if (destination.error) {
        navigate('/dashboard/destinations-created-by-user', { replace: true });
        return null;
    }

    return (
        <div className="container">
            {destination.isLoading && <h1>Loading...</h1>}

            <section>
                <div>dasdsadasdsa</div>
                <div>dasdsadasdsa</div>
                <div>dasdsadasdsa</div>
            </section>
        </div>
    );
};
