import styles from './SearchBar.module.css';
import { MagnifyingGlass } from 'phosphor-react';

export const SearchBar = () => {
    return (
        <section>
            <form>
                <div className={styles.wrapper}>
                    <input
                        className={styles.search}
                        type="search"
                        placeholder="Search for a country, city or place"
                    />
                    <button type="submit">
                        <MagnifyingGlass size={28} />
                    </button>
                </div>
            </form>
        </section>
    );
};
