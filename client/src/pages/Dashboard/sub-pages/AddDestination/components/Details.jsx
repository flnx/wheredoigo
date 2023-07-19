import { OverlayDisabledBodyScroll } from '../../../../../components/OverlayDisabledBodyScroll/OverlayDisabledBodyScroll';
import { TipTap } from '../../../../../components/TipTap/TipTap';

export const Details = ({ showDetailHandler, selectedDetail, updateDetail }) => {
    const titleStyles = {
        padding: '1rem',
        textAlign: 'center',
    };

    const wrapperStyles = {
        padding: '0.75rem',
    };

    return (
        <OverlayDisabledBodyScroll closeModalHandler={() => showDetailHandler({ name: '' })}>
            <div style={wrapperStyles}>
                <h3 style={titleStyles}>{selectedDetail.name}</h3>

                <TipTap
                    content={selectedDetail.content}
                    onChangeHandler={(content) => updateDetail(selectedDetail.name, content)}
                />
            </div>
        </OverlayDisabledBodyScroll>
    );
};
