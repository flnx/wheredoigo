import { useState } from 'react';
import { useFetchPlacesData } from '../../../../hooks/queries/useFetchPlaceData';

import { FormSelect } from '../../../../components/FormSelect/FormSelect';
import { PieChart } from './components/PieChart';

import styles from './SideStats.module.css';

const data = [
    {
        rating: '5 stars',
        userVotes: 0,
    },
    {
        rating: '4 star',
        userVotes: 0,
    },
    {
        rating: '3 stars',
        userVotes: 0,
    },
    {
        rating: '2 stars',
        userVotes: 0,
    },
    {
        rating: '1 stars',
        userVotes: 0,
    },
];

export const SideStats = () => {
    const [placesNames, isLoading, error] = useFetchPlacesData();
    // const [inputValue, setInputValue] = useState(placesNames[0]);
    console.log(placesNames);

    const onChangeHandler = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={styles.chart}>
            {/* <FormSelect
                value={inputValue}
                options={placesNames}
                onChangeHandler={onChangeHandler}
                label={'Place'}
                errors={[]}
            /> */}
            <section>
                {!isLoading && !error && <PieChart data={data} />}
            </section>
        </div>
    );
};
