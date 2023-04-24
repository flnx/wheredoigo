import { memo } from 'react';
import { Place } from '../../../../components/Place/Place';

const Places = ({ places, destinationId }) => {

    return (
        places.map(place => <Place place={place} />)
    )
};

export const MemoizedPlaces = memo(Places);
