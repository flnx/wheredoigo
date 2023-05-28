import { useEffect, useState } from 'react';
import { useFetchPlacesData } from '../../../../hooks/queries/useFetchPlaceData';

import { FormSelect } from '../../../../components/FormSelect/FormSelect';
import { PieChart } from './components/PieChart';

import styles from './SideStats.module.css';

export const SideStats = () => {
    const [placesData, isLoading, error] = useFetchPlacesData();
    const [inputValue, setInputValue] = useState(placesData[0]);

    useEffect(() => {
        setInputValue(placesData[0]);
    }, [placesData]);

    const onChangeHandler = (e) => {
        const placeName = e.target.value;
        const placeData = placesData.find((p) => p.name === placeName);
        setInputValue(placeData);
    };

    const placeNamesArr = placesData.map((p) => p.name);

    return (
        <div className={styles.chart}>
            <FormSelect
                value={inputValue?.name}
                options={placeNamesArr}
                onChangeHandler={onChangeHandler}
                label={'Place'}
                errors={[]}
            />
            <section>
                {inputValue && (
                    <PieChart
                        placeData={inputValue}
                    />
                )}
            </section>
        </div>
    );
};
