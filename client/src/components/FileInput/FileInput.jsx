export const FileInput = ({ onImageSelected, inputRef }) => {
    const onChangeHandler = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            onImageSelected(imageUrl);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={onChangeHandler}
                style={{ display: 'none' }}
                onClick={(e) => (e.target.value = null)}
            />
        </div>
    );
};
