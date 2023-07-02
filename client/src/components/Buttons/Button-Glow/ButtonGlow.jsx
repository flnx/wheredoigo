import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import styles from './ButtonGlow.module.css';

export const ButtonGlow = ({ children }) => {
    // const hidden = isLoading ? styles.hidden : null;

    return (
        <section className="mb-2">
            <Link to="#" className={styles.neonBtn}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {children}
            </Link>
        </section>
    );
};

// {isLoading && (
//     <ClipLoader
//         color="#36d7b7"
//         aria-label="Loading Spinner"
//         size={22}
//         className={styles.spinner}
//     />
// )}
