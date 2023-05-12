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

    const handleSearchParams = (e, value) => {
        e.preventDefault();
        const searchQuery = value ? { search: value } : {};

        setSearchParams(searchQuery);
    };

    const onCategoryClickHandler = (category) => {
        console.log(category);
    };

    return (
        <Container mb={3}>
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>
                <SearchBar searchParamsHandler={handleSearchParams} />
                <HashTagCategories tags={['Island', 'Beach', 'Island', 'Beach', 'Island', 'Beach']}/>
                <CategoriesNav onCategoryClickHandler={onCategoryClickHandler} />
                <Destinations searchParams={searchParams?.get('search')} />
            </div>
        </Container>
    );
};
