// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { Destination } from '../../components/Destination/Destination';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { SideNavigation } from '../../components/SideNav/SideNavigation';

import styles from './Dashboard.module.css';

export const Dashboard = () => {
    return (
        <div className="container">
            <div className={styles.grid}>

                <section className={styles.sideNav}>
                    <SideNavigation />
                </section>

                <section className={styles.searchBar}>
                    <SearchBar />
                </section>

                <section className={styles.categories}>
                    <CategoriesNav />
                </section>

                <div className={styles.destinations}>
                    {myDestinations.map((x) => (
                        <Destination destination={x} key={x.country} />
                    ))}
                </div>
                <aside className={styles.stats}>
                    <div>
                        <h2>Statistics</h2>
                        <div>
                            <p>Progress Bar</p>
                            <p>Progress Bar 2</p>
                            <p>Progress Bar 3</p>
                        </div>
                        <div>
                            <p>Chart</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

const myDestinations = [
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
    }, {
        country: 'Croatia 5',
        city: 'Zagreb',
        price: 499,
        rating: 5,
        imageUrl:
            'https://images.pexels.com/photos/3580531/pexels-photo-3580531.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    }, {
        country: 'Croatia 6',
        city: 'Zagreb',
        price: 499,
        rating: 5,
        imageUrl:
            'https://images.pexels.com/photos/3580531/pexels-photo-3580531.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    }
];
