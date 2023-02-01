import { PrimaryButton } from '../../../components/Buttons/Primary-Btn/PrimaryButton';
import { SearchBar } from '../../../components/Serach-Bar/SearchBar';
import styles from './Showcase.module.css';

export const Showcase = () => {
    return (
            <div className={styles.showcase}>
                <div className="container">
                    <div className={styles.intro}>
                        <h1>Discover the world. Adventure is out there</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ex, voluptates.
                        </p>
                        <div className={styles.buttons}>
                            <PrimaryButton>Discover</PrimaryButton>
                        </div>
                        <SearchBar />
                    </div>
                </div>
            </div>
    );
};
