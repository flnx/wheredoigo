import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const LoadingSkeleton = () => {
    return (
        <Skeleton 
            height="100%" 
            baseColor="#dbc5bb" 
            highlightColor="#ffffff8a"
            duration={1}
        />
    );
};