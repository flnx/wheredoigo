import { Destination } from '../../../components/Destination/Destination';
import styles from './Destinations.module.css';

export const Destinations = () => {
    return (
        <section>
            <div className="container">
                <h2 className={styles.title}>Highest rated destinations:</h2>
                <div className={styles.wrapper}>
                    {topDestinationsByRating.map((x) => (
                        <Destination key={x.country} destination={x} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const topDestinationsByRating = [
    {
        country: 'Croatia',
        city: 'Zagreb',
        price: 499,
        rating: 5,
        imageUrl:
            'https://images.pexels.com/photos/161393/croatia-city-rovinje-port-161393.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
    {
        country: 'Croatia 2',
        city: 'Zagreb',
        price: 499,
        rating: 5,
        imageUrl:
            'https://images.pexels.com/photos/14133589/pexels-photo-14133589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
    {
        country: 'Croatia 3',
        city: 'Zagreb',
        price: 499,
        rating: 5,
        imageUrl:
            'https://images.pexels.com/photos/4846620/pexels-photo-4846620.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
    {
        country: 'Croatia 4',
        city: 'Zagreb',
        price: 499,
        rating: 5,
        imageUrl:
            'https://images.pexels.com/photos/3580531/pexels-photo-3580531.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    },
];
