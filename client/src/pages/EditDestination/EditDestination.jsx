import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';

import styles from './EditDestination.module.css';

export const EditDestination = () => {
    const navigate = useNavigate();
    const { state: destinationId } = useLocation();
    const { data, error, isLoading } = destinationId
        ? useRequestEditDestinationPermissions(destinationId)
        : null;
    const [editableFields, setEditableFields] = useState(false);
    const [formFields, setFormFields] = useState({});

    useEffect(() => {
        if (!destinationId) {
            navigate('/dashboard/destinations-created-by-user', { replace: true });
        }
    }, []);

    useEffect(() => {
        if (data) {
            setFormFields(data);
        }
    }, [data]);

    if (!destinationId || !data) return;

    if (error) {
        navigate('/dashboard/destinations-created-by-user', { replace: true });
        return null;
    }

    const handleEdit = (field) => {
        // enables/disables the form fields
        setEditableFields((prevState) => ({ ...prevState, [field]: true }));
    };

    const handleSave = (field) => {
        // sends the changes to the server
        setEditableFields((prevState) => ({ ...prevState, [field]: false }));
    };

    const handleCancel = (field) => {
        // resets the form to its original state
        setEditableFields((prevState) => ({ ...prevState, [field]: false }));
        setFormFields((prevState) => ({
            ...prevState,
            [field]: data[field],
        }));
    };

    const handleChangeFormFields = (e, field) => {
        setFormFields((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    return (
        <div className="container">
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <section className={styles.section}>
                    <h1>Edit Destination</h1>
                    <form className={styles.form}>
                        <div>
                            <label htmlFor="country">Country:</label>
                            <input
                                id="country"
                                type="text"
                                disabled={!editableFields['country']}
                                value={formFields?.country || ''}
                                onChange={(e) => handleChangeFormFields(e, 'country')}
                            />
                            {editableFields['country'] ? (
                                <>
                                    <button type="button" onClick={() => handleSave('country')}>
                                        Save
                                    </button>
                                    <button type="button" onClick={() => handleCancel('country')}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button type="button" onClick={(e) => handleEdit('country')}>
                                    Edit
                                </button>
                            )}
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <input id="city" type="text" />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" />
                        </div>
                        {data.details.map((detailCategory) => (
                            <div className={styles.detailCategory} key={detailCategory._id}>
                                <h2>{detailCategory.category}</h2>
                                {detailCategory.info.map((detail) => (
                                    <div className={styles.detail} key={detail._id}>
                                        <label htmlFor={`detail-${detail._id}-title`}>
                                            {detail.title}:
                                        </label>
                                        <input id={`detail-${detail._id}-title`} type="text" />
                                        <label htmlFor={`detail-${detail._id}-description`}>
                                            Description:
                                        </label>
                                        <textarea id={`detail-${detail._id}-description`} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </form>
                </section>
            )}
        </div>
    );
};
