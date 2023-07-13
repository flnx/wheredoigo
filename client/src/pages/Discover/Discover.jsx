import { validateCategoriesOnSearch } from '../../utils/formValidators';
import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { Destinations } from './components/Destinations/Destinations';
import { Container } from '../../components/Containers/Container/Container';
import { HashTagCategories } from './components/HashTagCategories/HashTagCategories';

import styles from './Discover.module.css';

export const Discover = () => {
    // Retrieve search parameters from the URL
    const [searchParams, setSearchParams] = useSearchParams({});
    useDocumentTitle('Discover');

    // Extract the "search" query parameter from the searchParams
    const searchParam = searchParams.get('search') || '';

    // Filters out the invalid / repeating categories (if user enters them via URL)
    const categories = validateCategoriesOnSearch(searchParams);

    // Validate and filter out invalid/repeating categories from the searchParams
    const updateSearchParamsHandler = (newSearch) => {
        // Update the URL query parameters with the newly selected "categories" and "search"
        const updatedParams = {
            category: categories, // Initialize with current categories
        };

        // Add "search" query parameter if the user has entered any value
        if (newSearch) {
            updatedParams.search = newSearch;
        }

        // Update the URL with the new query parameters
        setSearchParams(updatedParams);
    };

    // Handle click on a hashtag - receives updated categories
    const onHashTagClickHandler = (updatedParams) => {
        // Preserve the search query in the URL when updating
        if (searchParam) {
            updatedParams.search = searchParam;
        }

        // Update the URL with the filtered categories
        setSearchParams(updatedParams);
    };

    // Handle click on a category - adds the clicked category to the URL
    const onCategoryClickHandler = (category) => {
        // If the category already exists, don't update the URL
        if (categories.includes(category)) return;

        // Add the clicked category to the current categories
        const updatedParams = {
            category: [...categories, category],
        };

        // Preserve the search query in the URL when updating
        if (searchParam) {
            updatedParams.search = searchParam;
        }

        // Update the URL with the filtered categories
        setSearchParams(updatedParams);
    };

    console.log('hello')

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

                {/* Pass the updated URL queries to trigger a new fetch request */}
                <Destinations searchParam={searchParam} categoryParams={categories.join()} />
            </div>
        </Container>
    );
};
