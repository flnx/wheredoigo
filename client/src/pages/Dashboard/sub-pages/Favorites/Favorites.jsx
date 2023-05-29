import { useUserFavorites } from '../../../../hooks/queries/useUserFavorites';
import { extractServerErrorMessage } from '../../../../utils/utils';

// Components
import { ClipLoader } from 'react-spinners';
import { DestinationsGrid } from '../../../../components/DestinationsGrid/DestinationsGrid';
import { ServerError } from '../../../../components/ServerError/ServerError';

export const Favorites = () => {
    const [data, isLoading, error] = useUserFavorites();

    const destinations = data || [];
    const hasDestinations = !isLoading && destinations.length > 0;

    return (
        <div style={{ display: 'grid' }}>
            <h1 className="smaller mb-1">Favorites</h1>
            {hasDestinations ? (
                <DestinationsGrid destinations={destinations} />
            ) : (
                <p>You don't have favorite destinations yet</p>
            )}

            {isLoading && (
                <span style={{ margin: '5rem auto' }}>
                    <ClipLoader color="#36d7b7" aria-label="Loading Spinner" size={45} />
                </span>
            )}

            {error && (
                <>
                    <p>{extractServerErrorMessage(error)}</p>
                    <ServerError errorMessage={error} />
                </>
            )}
        </div>
    );
};
