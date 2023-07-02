import { ButtonGlow } from '../../../../components/Buttons/Button-Glow/ButtonGlow';

export const GenerateAIComments = ({ placeId }) => {
    const { mutate, isLoading, error } = useGenerateAIComments(placeId);

    return (
        <section>
            <ButtonGlow>Generate AI Comments</ButtonGlow>
        </section>
    );
};
