import { validateCategoriesOnSearch } from '../../utils/formValidators';
import { useSearchParams } from 'react-router-dom';

// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { Destinations } from './components/Destinations/Destinations';
import { Container } from '../../components/Containers/Container/Container';
import { HashTagCategories } from './components/HashTagCategories/HashTagCategories';

import styles from './Discover.module.css';

export const Discover = () => {
    // useSearchParam hook to base the search on the URL
    const [searchParams, setSearchParams] = useSearchParams({});

    // Extracts the "search" URL query search value from searchParams
    const searchParam = searchParams.get('search') || '';

    // Filters out the invalid / repeating categories (if user enters them via URL)
    const categories = validateCategoriesOnSearch(searchParams);

    // Updates the URL queries with the newly picked "categories" and "search"
    const updateSearchParamsHandler = (newSearch) => {
        // - newSearch prop is the current user search input value from SearchBar

        // - This is the object that'll update the URL queries, initialized with categories (empty or not)
        const updatedParams = {
            category: categories,
        };
        
        // - Adds a "search" prop/query if the user has entered any 
        // - In this way we also avoid setting an empty "search" query if the user has entered only categories
        if (newSearch) {
            updatedParams.search = newSearch;
        }
        
        // Updating the URL with the new queries "search" and "categories"
        setSearchParams(updatedParams);
    };

    // #hashtag click handler - accepts updated categories
    // HashTagCategories component filters out the clicked category and passes the updated categories
    const onHashTagClickHandler = (updatedParams) => {
        // This ensures that the search query will stay in the URL when the hook updates the url
        if (searchParam) {
            updatedParams.search = searchParam;
        }

        // Updating the URL with the filtered categories
        setSearchParams(updatedParams);
    };

    // This handlerr adds the clicked category in the URL
    // Also adds a #hashtag (that can be removed on click - check onHashTagClickHandler)

    const onCategoryClickHandler = (category) => {
        // If the category already exists, it doesn't update the url
        if (categories.includes(category)) return;

        // Adding the clicked category to the current categories (if any)
        const updatedParams = {
            category: [...categories, category],
        };

         // This ensures that the search query will stay in the URL when the hook updates the url
        if (searchParam) {
            updatedParams.search = searchParam;
        }

        // Updating the URL with the filtered categories
        setSearchParams(updatedParams);
    };

    return (
        <Container mb={3}>
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>
                <SearchBar searchParamsSubmitHandler={updateSearchParamsHandler} />
                <HashTagCategories
                    categories={categories}
                    onHashTagClickHandler={onHashTagClickHandler}
                />
                <CategoriesNav onCategoryClickHandler={onCategoryClickHandler} />
                
                {/* Passing down the updated URL quries here to trigger a new fetch request */}
                <Destinations searchParam={searchParam} categoryParams={categories.join()} />
            </div>
        </Container>
    );
};
