import { useSearchParams } from 'react-router-dom';

import { capitalizeFirstLetter } from '../../utils/utils';

// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { ContinentsNav } from '../../components/ContinentsNav/ContinentsNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { Destinations } from './Destinations/Destinations';

import styles from './Discover.module.css';

export const Discover = () => {
    const [searchParams, setSearchParams] = useSearchParams('');

    const handleSearchParams = (e, value) => {
        e.preventDefault();
        setSearchParams({ search: capitalizeFirstLetter(value) });
    };

    // useEffect(() => {
    //     const userSearch = searchParams.get('search');
        
    //     getPlacesByCountry(userSearch).then((res) => {
    //         console.log(res);
    //     });
    // }, [searchParams]);

    return (
        <div className="container">
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>
                <SearchBar searchParamsHandler={handleSearchParams} />
                <ContinentsNav />
                {/* <CitiesSlider /> */}
                <CategoriesNav />
                <Destinations searchParams={searchParams.get('search')}/>
            </div>
        </div>
    );
};
