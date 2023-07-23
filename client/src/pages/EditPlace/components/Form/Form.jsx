import PropTypes from 'prop-types';

import { useForm } from './useForm';
import { capitalizeFirstLetter } from '../../../../utils/utils';

// Components
import { SelectType } from '../SelectType/SelectType';
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
import { FormLoadingSkeleton } from '../../../../components/FormLoadingSkeleton/FormLoadingSkeleton';
import { TextWrap } from '../../../../components/TextWrap/TextWrap';

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
        isEditToggled,
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
            <form>
                {isLoading && <FormLoadingSkeleton />}

                {!isLoading && (
                    <>
                        {fieldsToUpdate.map((fieldName) => (
                            <MemoizedFormFieldEditor
                                fieldId={fieldName}
                                title={capitalizeFirstLetter(fieldName)}
                                desc={data[fieldName]}
                                onEditButtonClickHandler={onEditButtonClickHandler}
                                isEditable={isEditToggled[fieldName]}
                                submitHandler={sendEditedFieldClickHandler}
                                isLoading={isEditLoading}
                                error={editError}
                                key={fieldName}
                            />
                        ))}

                        <SelectType
                            typeId={typeId}
                            isEditToggled={isEditToggled[typeId]}
                            selectedType={data.type}
                            types={allowedPlaceCategories}
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            submitHandler={sendEditedFieldClickHandler}
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
