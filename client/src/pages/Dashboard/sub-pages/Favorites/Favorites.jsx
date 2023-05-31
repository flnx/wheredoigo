import { useUserFavorites } from '../../../../hooks/queries/useUserFavorites';
import { extractServerErrorMessage } from '../../../../utils/utils';

// Components
import { ClipLoader } from 'react-spinners';
import { DestinationsGrid } from '../../../../components/DestinationsGrid/DestinationsGrid';
import { ServerError } from '../../../../components/ServerError/ServerError';

export const Favorites = () => {
    const [data, isLoading, error] = useUserFavorites();

    const destinations = data || [];
    const hasDestinations = destinations.length > 0;

    return (
        <div style={{ display: 'grid' }}>
            <h1 className="smaller mb-2">Favorites</h1>

            {isLoading ? (
                <span style={{ margin: '5rem auto' }}>
                    <ClipLoader color="#36d7b7" aria-label="Loading Spinner" size={45} />
                </span>
            ) : (
                <>
                    {!hasDestinations && <p>You don't have favorite destinations yet</p>}
                    {!isLoading && hasDestinations && (
                        <DestinationsGrid destinations={destinations} />
                    )}
                </>
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
