import PropTypes from 'prop-types';
import { useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import styles from './SearchBar.module.css';

const propTypes = {
    searchParamsSubmitHandler: PropTypes.func.isRequired,
};

export const SearchBar = ({ searchParamsSubmitHandler }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        searchParamsSubmitHandler(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.wrapper}>
                <input
                    className={styles.search}
                    type="search"
                    placeholder="Search a destination you'd like to visit"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    role="search"
                />
                <button type="submit">
                    <MagnifyingGlass size={28} aria-label="Search icon" />
                </button>
            </div>
        </form>
    );
};

SearchBar.propTypes = propTypes;
