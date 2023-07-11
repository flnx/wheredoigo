import { useUserFavorites } from '../../../../hooks/queries/useUserFavorites';

// Components
import { ClipLoader } from 'react-spinners';
import { DestinationsGrid } from '../../../../components/DestinationsGrid/DestinationsGrid';
import { ServerErrorPopUp } from '../../../../components/ServerErrorPopUp/ServerErrorPopUp';

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
                    {!error && !hasDestinations && (
                        <p>You don't have favorite destinations yet</p>
                    )}
                    {!isLoading && <DestinationsGrid destinations={destinations} />}
                </>
            )}

            {error && (
                <>
                    <ServerErrorPopUp errorMessage={error} />
                </>
            )}
        </div>
    );
};
