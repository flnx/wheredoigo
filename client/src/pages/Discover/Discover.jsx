import { useSearchParams } from 'react-router-dom';

// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { Destinations } from './Destinations/Destinations';
import { Container } from '../../components/Containers/Container/Container';
import { HashTagCategories } from '../../components/HashTagCategories/HashTagCategories';

import styles from './Discover.module.css';
import { validateCategories } from '../../utils/formValidators';

export const Discover = () => {
    const [searchParams, setSearchParams] = useSearchParams({});

    const searchParam = searchParams.get('search') || '';
    const categories = validateCategories(searchParams);

    const handleSearchParams = (e, newSearch) => {
        e.preventDefault();

        const updatedParams = {
            category: categories,
        };

        if (newSearch) {
            updatedParams.search = newSearch;
        }

        setSearchParams(updatedParams);
    };

    const onHashTagClickHandler = (hashTag) => {
        const updatedParams = {
            category: categories.filter((tag) => tag !== hashTag),
        };

        if (searchParam) {
            updatedParams.search = searchParam;
        }

        setSearchParams(updatedParams);
    };

    const onCategoryClickHandler = (category) => {
        if (categories.includes(category)) return;

        const updatedParams = {
            category: [...categories, category],
        };

        if (searchParam) {
            updatedParams.search = searchParam;
        }

        setSearchParams(updatedParams);
    };

    return (
        <Container mb={3}>
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>
                <SearchBar searchParamsHandler={handleSearchParams} />
                <HashTagCategories
                    tags={categories}
                    onHashTagClickHandler={onHashTagClickHandler}
                />
                <CategoriesNav onCategoryClickHandler={onCategoryClickHandler} />
                <Destinations searchParam={searchParam} categoryParams={categories.join()} />
            </div>
        </Container>
    );
};
