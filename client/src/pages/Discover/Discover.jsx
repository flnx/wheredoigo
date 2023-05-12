import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { Destinations } from './Destinations/Destinations';
import { Container } from '../../components/Containers/Container/Container';
import { HashTagCategories } from '../../components/HashTagCategories/HashTagCategories';

import styles from './Discover.module.css';

export const Discover = () => {
    const [searchParams, setSearchParams] = useSearchParams('');
    const [hashTagCategories, setHashTagCategories] = useState([]);

    const handleSearchParams = (e, value) => {
        e.preventDefault();
        const searchQuery = value ? { search: value } : {};

        setSearchParams(searchQuery);
    };

    const onHashTagClickHandler = (hashTag) => {
        setHashTagCategories((prev) => prev.filter((tag) => tag !== hashTag));
    };

    const onCategoryClickHandler = (category) => {
        setHashTagCategories((prev) => {
            if (prev.includes(category)) {
                return prev;
            }

            return [...prev, category];
        });
    };

    return (
        <Container mb={3}>
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>
                <SearchBar searchParamsHandler={handleSearchParams} />
                <HashTagCategories
                    tags={hashTagCategories}
                    onHashTagClickHandler={onHashTagClickHandler}
                />
                <CategoriesNav onCategoryClickHandler={onCategoryClickHandler} />
                <Destinations searchParams={searchParams?.get('search')} />
            </div>
        </Container>
    );
};
