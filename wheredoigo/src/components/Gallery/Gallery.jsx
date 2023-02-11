import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import styles from './Gallery.module.css';

export const Gallery = ({ images }) => {
    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    const testClick = () => {
        console.log('clicked');
    };

    return (
        <section>
            <div className={styles.overlay} onClick={testClick}/>
            <div className={styles.wrapper}>
                <h1>Hello</h1>
                <img src={images[0]} alt="img" />
                <img src={images[0]} alt="img" />
                {/* {images.map((img) => (
                    <img src={img} alt="image " />
                ))} */}
            </div>
        </section>
    );
};
