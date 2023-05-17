import styles from './SearchBar.module.css';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';

export const SearchBar = ({ searchParamsSubmitHandler }) => {
    const [value, setValue] = useState('');

    return (
        <form onSubmit={(e) => searchParamsSubmitHandler(e, value)}>
            <div className={styles.wrapper}>
                <input
                    className={styles.search}
                    type="search"
                    placeholder="Search for a country, city or place"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">
                    <MagnifyingGlass size={28} />
                </button>
            </div>
        </form>
    );
};
