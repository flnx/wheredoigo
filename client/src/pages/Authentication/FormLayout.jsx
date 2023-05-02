import { LoginPage } from './Login/Login';
import { RegisterPage } from './Register/Register';

import styles from './FormLayout.module.css';

const FormLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.aside} />
            <div className={styles.wrapper}>{children}</div>
        </div>
    );
};

export const Login = () => {
    return (
        <FormLayout>
            <LoginPage />
        </FormLayout>
    );
};

export const Register = () => {
    return (
        <FormLayout>
            <RegisterPage />
        </FormLayout>
    );
};
