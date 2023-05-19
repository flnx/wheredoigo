import styles from './Main.module.css';
import { CreatorData } from './components/CreatorData';


export const Main = () => {
    return (
        <div className={styles.container}>
           <CreatorData />


        </div>
    );
};
