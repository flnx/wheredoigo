import PropTypes from 'prop-types';

// Custom Hooks
import { useForm } from './useForm';

// Local Components
import { SelectType } from '../SelectType/SelectType';

// Global Components
import { MemoizedFormFieldEditor } from 'src/components/FormFieldEditor/FormFieldEditor';
import { FormLoadingSkeleton } from 'src/components/FormLoadingSkeleton/FormLoadingSkeleton';
import { TextWrap } from 'src/components/TextWrap/TextWrap';

const propTypes = {
    data: PropTypes.object.isRequired,
    placeId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    destinationId: PropTypes.string,
};

export const Form = ({ data, placeId, destinationId, isLoading }) => {
    const formProps = useForm({ data, placeId, destinationId });
    const { isEditLoading, editError, isEditToggled, toggleEditHandler } = formProps;
    const { submitName, submitType, submitDescription } = formProps;

    return (
        <section>
            <h3>
                <TextWrap isLoading={isLoading} content={'Place Info'} />
            </h3>
            <form>
                <section className="flex-column">
                    {isLoading && <FormLoadingSkeleton />}
                </section>

                {!isLoading && (
                    <>
                        {/* Name */}
                        <MemoizedFormFieldEditor
                            fieldId={'name'}
                            title={'Name'}
                            desc={data.name}
                            onEditButtonClickHandler={toggleEditHandler}
                            isEditToggled={isEditToggled.name}
                            submitHandler={submitName}
                            isLoading={isEditLoading}
                            error={editError}
                            limitChars={60}
                            hideMenu={true}
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
