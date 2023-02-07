import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';

export const DestinationDetails = () => {
    const { destinationId } = useParams();

    const { data: destination } = useDestination(destinationId);

    console.log(destination.data);

    return <h1>DestinationDetails</h1>;
};
