import { ButtonGlow } from '../../../../components/Buttons/Button-Glow/ButtonGlow';
import { DarkOverlay } from '../../../../components/DarkOverlay/DarkOverlay';
import { ServerErrorPopUp } from '../../../../components/ServerErrorPopUp/ServerErrorPopUp';
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

            {isLoading && (
                <DarkOverlay 
                    isLoading={isLoading} 
                    text={'This may take a while'} 
                />
            )}

            {error && <ServerErrorPopUp errorMessage={error} />}
        </section>
    );
};
