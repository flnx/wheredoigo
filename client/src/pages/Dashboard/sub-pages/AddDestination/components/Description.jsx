import { ShowFormError } from '../../../../../components/ShowFormError/ShowFormError';
import { TipTap } from '../../../../../components/TipTap/TipTap';
import styles from '../AddDestination.module.css';

export const Description = ({ updateField, description, errors }) => {
    return (
        <div
            className={styles.formField}
            style={{ backgroundColor: '#fff', padding: 0, boxShadow: 'none' }}
        >
            <label htmlFor="description">Description</label>
            <TipTap />
        </div>
    );
};

// export const Description2 = ({ updateField, description, errors }) => {
//     const onChangeHandler = (e) => {
//         updateField(e.target.name, e.target.value);
//     };

//     const hasError = errors.some((msg) => msg.includes('Description'));
//     const validField = `${description.length >= 50 ? styles.validField : ''}`;
//     const invalidField = `${hasError && description.length < 50 ? styles.error : ''}`;

//     return (
//         <div className={styles.formField}>
//             <label htmlFor="description">Description</label>
//             <textarea
//                 id="description"
//                 rows="8"
//                 name="description"
//                 placeholder="Add a description"
//                 value={description}
//                 onChange={onChangeHandler}
//                 className={`${validField} ${invalidField}`}
//             />

//             {invalidField && <ShowFormError errors={errors} errorParam={'Description'} />}
//         </div>
//     );
// };
