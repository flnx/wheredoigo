import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const LoadingSkeleton = () => {
    return (
        <Skeleton 
            height="100%" 
            baseColor="#8a543f" 
            highlightColor="#c97959"
        />
    );
};