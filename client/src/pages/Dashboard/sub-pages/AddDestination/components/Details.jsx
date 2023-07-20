import { useState } from 'react';

// Components
import { TipTap } from '../../../../../components/TipTap/TipTap';
import { OverlayDisabledBodyScroll } from '../../../../../components/OverlayDisabledBodyScroll/OverlayDisabledBodyScroll';
import { ButtonSky } from '../../../../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../../../../components/Buttons/Cancel-Button/CancelButton';
import { CustomConfirmModal } from '../../../../../components/CustomConfirmModal/CustomConfirmModal';
import { ButtonPairsWrapper } from '../../../../../components/Containers/ButtonPairsWrapper/ButtonPairsWrapper';
import { WarningButton } from '../../../../../components/Buttons/Button-Warning/WarningButton';

export const Details = ({ selectedDetail, updateDetail, hideDetailHandler }) => {
    const [popUpConfirmCloseModal, setPopUpConfirmCloseModal] = useState(false);
    const [detailContent, setDetailContent] = useState(selectedDetail.content);
    const hasChanges = selectedDetail.content !== detailContent;

    const confirmModalCloseHandler = () => {
        if (hasChanges) {
            setPopUpConfirmCloseModal((prev) => !prev);
        } else {
            hideDetailHandler();
        }
    };

    const updateContentBeforeSavingHandler = (content) => {
        setDetailContent(content);
    };

    const updateAndSaveDetailHandler = () => {
        hideDetailHandler();
        updateDetail(selectedDetail.name, detailContent);
    };

    return (
        <OverlayDisabledBodyScroll closeModalHandler={confirmModalCloseHandler}>
            <div
                style={{
                    padding: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <h3 style={{ padding: '0.25rem', textAlign: 'center' }}>
                    {selectedDetail.name}
                </h3>
                <TipTap
                    content={detailContent}
                    onChangeHandler={updateContentBeforeSavingHandler}
                />
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <ButtonSky onClickHandler={updateAndSaveDetailHandler}>Save</ButtonSky>
                    <CancelButton onClickHandler={confirmModalCloseHandler}>
                        Cancel
                    </CancelButton>
                </div>

                {popUpConfirmCloseModal && (
                    <CustomConfirmModal>
                        You have made changes that haven't been saved yet. Are you sure you
                        want to discard them without saving?
                        <ButtonPairsWrapper>
                            <WarningButton onClickHandler={hideDetailHandler}>
                                Leave & Discard
                            </WarningButton>
                            <CancelButton onClickHandler={confirmModalCloseHandler}>
                                Cancel
                            </CancelButton>
                        </ButtonPairsWrapper>
                    </CustomConfirmModal>
                )}
            </div>
        </OverlayDisabledBodyScroll>
    );
};
