import styles from './DetailsInputsFields.module.css';
import { MemoizedTextarea } from '../Textarea/Textarea';

export const DetailsInputs = ({
    name,
    info = [],
    isEditable,
    onEditClickHandler,
    destinationId,
    categoryId,
}) => {
    return (
        <div className={styles.detailsWrapper}>
            <h2 className={styles.catetegoryName}>{name || '🦖'}</h2>

            {info.map((x) => (
                <MemoizedTextarea
                    _id={x._id}
                    title={x.title}
                    desc={x.description}
                    onEditClickHandler={onEditClickHandler}
                    isEditable={isEditable[x._id]}
                    destinationId={destinationId}
                    categoryId={categoryId}
                    key={x._id}
                />
            ))}
        </div>
    );
};
