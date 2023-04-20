import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';

// Components
import { Textarea } from './EditInput';

import styles from './EditDestination.module.css';
import { useEditDestinationDetails } from '../../hooks/queries/useEditDestinationDetails';

export const EditDestination = () => {
    const navigate = useNavigate();
    const { state: destinationId } = useLocation();
    const { data, error, isLoading } = destinationId ? useRequestEditDestinationPermissions(destinationId) : {};
    const [editDestination, isEditError, isEditLoading] = useEditDestinationDetails();
    const [editableFields, setEditableFields] = useState({});
    const [cache, setCache] = useState({});
    const [formFields, setFormFields] = useState(false);

    useEffect(() => {
        if (!destinationId) {
            navigate('/dashboard/destinations-created-by-user', { replace: true });
        }
    }, []);

    useEffect(() => {
        if (data) {
            setFormFields(data);
            setCache(data);
        }
    }, [data]);

    if (!destinationId || !formFields) return;

    if (error) {
        navigate('/dashboard/destinations-created-by-user', { replace: true });
        return null;
    }

    const handleEdit = (field) => {
        // enables/disables the form fields
        setEditableFields((prevState) => {
            // set the clicked field to true
            const newState = { [field]: true };
            // set all other fields to false
            Object.keys(prevState).forEach((key) => {
                if (key !== field) {
                    newState[key] = false;
                }
            });

            return newState;
        });
    };

    const handleSave = (e, isDescription, field, updatedValue, categoryId, infoId) => {
        e.preventDefault();

        let editInfo = { destinationId: formFields._id };

        if (isDescription) {
            editInfo.description = updatedValue;
        } else {
            editInfo = { ...editInfo, categoryId, infoId, updatedValue };
        }

        editDestination(editInfo, {
            onSuccess: () => {
                setEditableFields((prevState) => ({ ...prevState, [field]: false }));
                setCache(formFields);
            },
        });
    };

    const handleCancel = (field) => {
        setEditableFields((prevState) => ({ ...prevState, [field]: false }));
        setFormFields(cache);
    };

    const handleFormFieldsChange = (e, field) => {
        setFormFields((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const handleFormFieldsDetailsChange = (e, propName, categoryId) => {
        setFormFields((prevState) => ({
            ...prevState,
            details: prevState.details.map((detail) => {
                if (detail._id == categoryId) {
                    const updatedInfo = detail.info.map((x) => {
                        if (x.title === propName) {
                            return {
                                ...x,
                                description: e.target.value,
                            };
                        } else {
                            return x;
                        }
                    });

                    return { ...detail, info: updatedInfo };
                } else {
                    return detail;
                }
            }),
        }));
    };

    return (
        <div className="container">
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <section className={styles.section}>
                    <h1>Update information for {`${formFields.city}, ${formFields.country}`}</h1>
                    <form className={styles.form}>
                        <Textarea
                            id={'description'}
                            value={formFields?.description}
                            onChangeHandler={handleFormFieldsChange}
                            isEditable={editableFields}
                            handleSave={(e) =>
                                handleSave(e, true, 'description', formFields?.description)
                            }
                            handleCancel={handleCancel}
                            handleEdit={handleEdit}
                            isLoading={isEditLoading}
                        />
                        {data.details.map((category, i) => (
                            <div className={styles.detailCategory} key={category._id}>
                                <h2>{category.category}</h2>

                                {category.info.map((detail, i2) => {
                                    const updatedValue = formFields?.details[i].info[i2].description;

                                    return (
                                        <Textarea
                                            id={detail.title}
                                            value={updatedValue}
                                            onChangeHandler={handleFormFieldsDetailsChange}
                                            isEditable={editableFields}
                                            handleSave={(e) =>
                                                handleSave(e, false, detail.title, updatedValue, category._id, detail._id)
                                            }
                                            handleCancel={handleCancel}
                                            handleEdit={handleEdit}
                                            categoryId={category._id}
                                            isLoading={isEditLoading}
                                            key={detail._id}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </form>
                </section>
            )}
        </div>
    );
};
