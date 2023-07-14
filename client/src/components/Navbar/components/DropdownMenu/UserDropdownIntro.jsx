export const UserDropdownIntro = ({ auth }) => {
    const containerStyles = {
        padding: '1rem',
        borderBottom: '1px solid yellow',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    };

    const avatarStyles = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid var(--minimalistic-red)',
    };

    const usernameStyles = {
        color: '#fff',
        fontWeight: 'bold',
    };

    return (
        <li style={containerStyles}>
            <img src={auth.avatarUrl} alt={auth.username} style={avatarStyles} />
            <div>
                <span style={usernameStyles}>@{auth.username}</span>
            </div>
        </li>
    );
};