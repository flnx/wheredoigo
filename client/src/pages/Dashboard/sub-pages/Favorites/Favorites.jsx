import { useUserFavorites } from '../../../../hooks/queries/useUserFavorites';

// Component
import { DestinationsGrid } from '../../../../components/DestinationsGrid/DestinationsGrid';
import { ClipLoader } from 'react-spinners';

export const Favorites = () => {
    const [destinations, isLoading, error] = useUserFavorites();

    return (
        <div styles={{ display: 'grid' }}>
            <h1 className="smaller mb-1">Favorites</h1>
            <DestinationsGrid destinations={destinations} />
            <ClipLoader
                loading={isLoading}
                color="#36d7b7"
                aria-label="Loading Spinner"
                size={45}
            />
        </div>
    );
};
