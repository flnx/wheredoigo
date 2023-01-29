import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CitiesSlider.module.css';
import images from '../../../utils/images';

export const CitiesSlider = () => {
    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    return (
        <motion.div
            ref={carousel}
            whileTap={{ cursor: 'grabbing' }}
            className={styles.carousel}
        >
            <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className={styles.inner}
            >
                {images.map((image, i) => {
                    return (
                        <motion.div className={styles.item} key={i}>
                            <img src={image} alt="img" />
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};
