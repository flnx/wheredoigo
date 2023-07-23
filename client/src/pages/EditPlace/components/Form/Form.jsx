import PropTypes from 'prop-types';

import { useForm } from './useForm';

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
    const formProps = useForm({ data, placeId, destinationId });
    const { isEditLoading, editError, isEditToggled, toggleEditHandler } = formProps;
    const { submitHandler, submitType, submitDescription } = formProps;

    return (
        <section>
            <h3>
                <TextWrap isLoading={isLoading} content={'Place Info'} />
            </h3>
            <form>
                {isLoading && <FormLoadingSkeleton />}

                {!isLoading && (
                    <>
                        {/* Name */}
                        <MemoizedFormFieldEditor
                            fieldId={'name'}
                            title={'Name'}
                            desc={data.name}
                            onEditButtonClickHandler={toggleEditHandler}
                            isEditToggled={isEditToggled.name}
                            submitHandler={submitHandler}
                            isLoading={isEditLoading}
                            error={editError}
                        />

                        {/* Description */}
                        <MemoizedFormFieldEditor
                            fieldId={'description'}
                            title={'Description'}
                            desc={data.description}
                            onEditButtonClickHandler={toggleEditHandler}
                            isEditToggled={isEditToggled.description}
                            submitHandler={submitDescription}
                            isLoading={isEditLoading}
                            error={editError}
                        />
                        {/* Select */}
                        <SelectType
                            typeId={'type'}
                            isEditToggled={isEditToggled.type}
                            selectedType={data.type}
                            types={data.allowedPlaceCategories}
                            onEditButtonClickHandler={toggleEditHandler}
                            submitHandler={submitType}
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
