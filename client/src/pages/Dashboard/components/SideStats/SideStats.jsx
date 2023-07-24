import { useErrorBoundary } from 'react-error-boundary';
import { useEffect, useState } from 'react';

// React Query Hooks
import { useFetchPlacesData } from 'src/hooks/queries/useFetchPlaceData';

// Global Ccomponents
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';
import { FormSelect } from 'src/components/FormSelect/FormSelect';

// Local Components
import { PieChart } from './components/PieChart';


import styles from './SideStats.module.css';

export const SideStats = () => {
    const { showBoundary } = useErrorBoundary();
    const [placesData, isLoading, error, serverError] = useFetchPlacesData();
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

    if (serverError) {
        showBoundary(serverError);
        return null;
    }

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
                {!isLoading && <PieChart placeData={inputValue} />}
            </section>

            {error && <ServerErrorPopUp errorMessage={error}/>}
        </div>
    );
};
