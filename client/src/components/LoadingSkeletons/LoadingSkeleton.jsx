import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const LoadingSkeleton = () => {
    return (
        <Skeleton 
            height="100%" 
            baseColor="#cca494" 
            highlightColor="#f2d9ce82"
            duration={1}
        />
    );
};