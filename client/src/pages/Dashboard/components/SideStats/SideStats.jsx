import { useEffect, useState } from 'react';
import { useFetchPlacesData } from '../../../../hooks/queries/useFetchPlaceData';

import { FormSelect } from '../../../../components/FormSelect/FormSelect';
import { PieChart } from './components/PieChart';

import styles from './SideStats.module.css';
import { ServerError } from '../../../../components/ServerError/ServerError';

export const SideStats = () => {
    const [placesData, isLoading, error] = useFetchPlacesData();
    const [inputValue, setInputValue] = useState({ name: '-- No Data --', data: [] });

    useEffect(() => {
        if (placesData.length > 0) {
            setInputValue(placesData[0]);
        }
    }, [placesData]);

    const onChangeHandler = (e) => {
        const placeName = e.target.value;
        const placeData = placesData.find((p) => p.name === placeName);
        setInputValue(placeData);
    };

    const placesNames = placesData.map((p) => p.name);

    return (
        <div className={styles.chart}>
            <FormSelect
                value={inputValue.name}
                options={placesNames}
                onChangeHandler={onChangeHandler}
                label={'Place'}
                errors={[]}
            />
            <section>
                {inputValue && <PieChart placeData={inputValue} />}
            </section>
            {error && <ServerError errorMessage={error}/>}
        </div>
    );
};
