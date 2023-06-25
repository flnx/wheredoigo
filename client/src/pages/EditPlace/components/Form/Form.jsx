import PropTypes from 'prop-types';

import { useForm } from './useForm';
import { capitalizeFirstLetter } from '../../../../utils/utils';

// Components
import { SelectType } from '../SelectType/SelectType';
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
import { FormLoadingSkeleton } from '../../../../components/FormLoadingSkeleton/FormLoadingSkeleton';
import { TextWrap } from '../../../../components/TextWrap/TextWrap';

import styles from './Form.module.css';

const propTypes = {
    data: PropTypes.object.isRequired,
    placeId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    destinationId: PropTypes.string,
};

export const Form = ({ data, placeId, destinationId, isLoading }) => {
    const {
        isEditLoading,
        editError,
        isEditable,
        typeId,
        allowedPlaceCategories,
        fieldsToUpdate,
        sendEditedFieldClickHandler,
        onEditButtonClickHandler,
    } = useForm({ data, placeId, destinationId });


    return (
        <section>
            <h3>
                <TextWrap isLoading={isLoading} content={'Place Info'} />
            </h3>
            <form className={styles.form}>
                {isLoading && <FormLoadingSkeleton />}

                {!isLoading && (
                    <>
                        {fieldsToUpdate.map((fieldName) => (
                            <MemoizedFormFieldEditor
                                fieldId={fieldName}
                                title={capitalizeFirstLetter(fieldName)}
                                desc={data[fieldName]}
                                onEditButtonClickHandler={onEditButtonClickHandler}
                                isEditable={isEditable[fieldName]}
                                sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                                isLoading={isEditLoading}
                                error={editError}
                                key={fieldName}
                            />
                        ))}

                        <SelectType
                            typeId={typeId}
                            isEditable={isEditable[typeId]}
                            selectedType={data.type}
                            types={allowedPlaceCategories}
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                            isLoading={isEditLoading}
                            error={editError}
                        />
                    </>
                )}
            </form>
        </section>
    );
};

Form.propTypes = propTypes;
