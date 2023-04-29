import { useParams } from 'react-router-dom';
import { useGetPlaceToEdit } from '../../hooks/queries/useGetPlaceToEdit';
import { extractServerErrorMessage } from '../../utils/utils';

// Components
import { Container } from '../../components/Containers/Container/Container';
import { Form } from './components/Form/Form';
import { FlexSectionContainer } from '../../components/Containers/FlexSectionContainer/FlexSectionContainer';

export const EditPlace = () => {
    const { placeId } = useParams();
    const [data, error, isLoading, isSuccess] = useGetPlaceToEdit(placeId);

    const placeTitle = `${data?.name}, ${data?.city}`;

    return (
        <Container>
            {isSuccess && (
                <>
                    <h1 className="smaller mb-2">Edit {placeTitle}</h1>

                    <FlexSectionContainer>
                        <Form data={data} placeId={placeId} destinationId={data._id} />
                        <section>Images</section>
                    </FlexSectionContainer>
                </>
            )}

            {isLoading && <h1>Loading...</h1>}
            {error && extractServerErrorMessage(error)}
        </Container>
    );
};
