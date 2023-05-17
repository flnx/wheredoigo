import { validateCategories } from '../../utils/formValidators';
import { useSearchParams } from 'react-router-dom';

// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { Destinations } from './components/Destinations/Destinations';
import { Container } from '../../components/Containers/Container/Container';
import { HashTagCategories } from './components/HashTagCategories/HashTagCategories';

import styles from './Discover.module.css';
import { LoadingSkeleton } from '../../components/LoadingSkeletons/LoadingSkeleton';

export const Discover = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const searchParam = searchParams.get('search') || '';

    // If the users enters invalid category in the url, it filters it out
    const categories = validateCategories(searchParams);

    const searchParamsSubmitHandler = (e, newSearch) => {
        e.preventDefault();

        const updatedParams = {
            category: categories,
        };

        // this will remove the ?search query from the url if the search param was deleted
        if (newSearch) {
            updatedParams.search = newSearch;
        }

        setSearchParams(updatedParams);
    };

    const onHashTagClickHandler = (updatedParams) => {
        setSearchParams(updatedParams);
    };

    const onCategoryClickHandler = (category) => {
        // avoids category hashtag repeating if it's set from the url
        if (categories.includes(category)) return;

        // adds new hashtag category
        const updatedParams = {
            category: [...categories, category],
        };

        // this will remove the ?search query from the url if the search param was deleted
        if (searchParam) {
            updatedParams.search = searchParam;
        }

        setSearchParams(updatedParams);
    };

    return (
        <Container mb={3}>
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>
                <SearchBar searchParamsHandler={searchParamsSubmitHandler} />
                <HashTagCategories
                    categories={categories}
                    onHashTagClickHandler={onHashTagClickHandler}
                />
                <CategoriesNav onCategoryClickHandler={onCategoryClickHandler} />
                <Destinations searchParam={searchParam} categoryParams={categories.join()} />
            </div>
        </Container>
    );
};
