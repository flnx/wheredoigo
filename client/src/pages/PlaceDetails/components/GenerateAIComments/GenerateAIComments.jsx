import { ButtonGlow } from '../../../../components/Buttons/Button-Glow/ButtonGlow';
import { DarkOverlay } from '../../../../components/DarkOverlay/DarkOverlay';
import { ServerError } from '../../../../components/ServerError/ServerError';
import { useGenerateAIComments } from '../../../../hooks/queries/useGenerateAIComments';

export const GenerateAIComments = ({ placeId }) => {
    const [generateAIComments, isLoading, error] = useGenerateAIComments(placeId);

    const onClickHandler = () => {
        generateAIComments({});
    };

    return (
        <section>
            <ButtonGlow onClickHandler={onClickHandler} isLoading={isLoading}>
                Generate AI Comments
            </ButtonGlow>

            <DarkOverlay isLoading={true} text={'This may take a while'}/>
            {/* {isLoading && <DarkOverlay isLoading={isLoading} />} */}
            {error && <ServerError errorMessage={error} />}
        </section>
    );
};
