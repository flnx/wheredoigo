import { ButtonGlow } from 'src/components/Buttons/Button-Glow/ButtonGlow';
import { DarkOverlay } from 'src/components/DarkOverlay/DarkOverlay';
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';
import { useGenerateAIComments } from 'src/hooks/queries/useGenerateAIComments';

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
