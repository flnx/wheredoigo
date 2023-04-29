import { useSearchParams } from 'react-router-dom';

// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { ContinentsNav } from '../../components/ContinentsNav/ContinentsNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { Destinations } from './Destinations/Destinations';

import styles from './Discover.module.css';
import { Container } from '../../components/Containers/Container/Container';

export const Discover = () => {
    const [searchParams, setSearchParams] = useSearchParams('');

    const handleSearchParams = (e, value) => {
        e.preventDefault();
        const searchQuery = value ? { search: value } : {};

        setSearchParams(searchQuery);
    };

    return (
        <Container>
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>
                <SearchBar searchParamsHandler={handleSearchParams} />
                <ContinentsNav />
                <CategoriesNav />
                <Destinations searchParams={searchParams?.get('search')} />
            </div>
        </Container>
    );
};
