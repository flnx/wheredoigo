import { ImagesPreviewer } from '../../../../components/ImagesPreviewer/ImagesPreviewer';
import styles from './EditImages.module.css';

export const EditImages = ({ images = [] }) => {
    const handleDeleteImage = (index) => {
        console.log(index)
    }

    return (
        <ImagesPreviewer 
            images={images} 
            handleDeleteImage={handleDeleteImage}
        />
    )
};