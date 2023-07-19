import { MemoizedFormFieldEditor } from '../../../../../components/FormFieldEditor/FormFieldEditor';

export const DetailsFormFields = ({
    onEditButtonClickHandler,
    isEditable,
    sendEditedFieldClickHandler,
    isLoading,
    error,
    details,
}) => {
    return details.map((detail) => (
        <div key={detail._id}>
            <MemoizedFormFieldEditor
                fieldId={detail._id}
                title={detail.name}
                desc={detail.content}
                onEditButtonClickHandler={onEditButtonClickHandler}
                isEditable={isEditable[detail._id]}
                sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                isLoading={isLoading}
                error={error}
                categoryId={detail._id}
            />
        </div>
    ));
};
