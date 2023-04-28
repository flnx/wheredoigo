import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';

export const DetailsFormFields = ({
    onEditButtonClickHandler,
    isEditable,
    sendEditedFieldClickHandler,
    isLoading,
    error,
    details,
}) => {
    return details.map((detail) => (
        <div style={{ marginBottom: '2rem' }} key={detail._id}>
            <h2 style={{ margin: '2rem 0 0.225rem 0' }}>{detail.category}</h2>
            {detail.info.map((x) => (
                <MemoizedFormFieldEditor
                    fieldId={x._id}
                    title={x.title}
                    desc={x.description}
                    onEditButtonClickHandler={onEditButtonClickHandler}
                    isEditable={isEditable[x._id]}
                    sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                    isLoading={isLoading}
                    error={error}
                    categoryId={detail._id}
                    key={x._id}
                />
            ))}
        </div>
    ));
};
