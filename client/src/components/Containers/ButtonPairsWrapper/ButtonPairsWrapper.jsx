export const ButtonPairsWrapper = ({ children }) => {
    const btnContainerStyles = {
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'flex-end',
        marginTop: '1.5rem',
    };

    return <div style={btnContainerStyles}>{children}</div>;
};
