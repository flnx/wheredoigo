import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';

// Components
import { Input, Textarea } from './EditInput';

import styles from './EditDestination.module.css';

export const EditDestination = () => {
    const navigate = useNavigate();
    const { state: destinationId } = useLocation();
    const { data, error, isLoading } = destinationId
        ? useRequestEditDestinationPermissions(destinationId)
        : {};
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
        setFormFields(formFields);
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
                    <h1>Edit Destination</h1>
                    <form className={styles.form}>
                        <Input
                            id={'country'}
                            value={formFields?.country}
                            onChangeHandler={handleFormFieldsChange}
                            isEditable={editableFields}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handleEdit={handleEdit}
                            formFields={formFields}
                        />

                        <Input
                            id={'city'}
                            value={formFields?.city}
                            onChangeHandler={handleFormFieldsChange}
                            isEditable={editableFields}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handleEdit={handleEdit}
                            formFields={formFields}
                        />

                        <Textarea
                            id={'description'}
                            value={formFields?.description}
                            onChangeHandler={handleFormFieldsChange}
                            isEditable={editableFields}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handleEdit={handleEdit}
                            formFields={formFields}
                        />
                        {data.details.map((category, i) => (
                            <div className={styles.detailCategory} key={category._id}>
                                <h2>{category.category}</h2>
                                {category.info.map((detail, i2) => (
                                    <Textarea
                                        id={detail.title}
                                        value={formFields.details[i].info[i2].description}
                                        onChangeHandler={handleFormFieldsDetailsChange}
                                        isEditable={editableFields}
                                        handleSave={handleSave}
                                        handleCancel={handleCancel}
                                        handleEdit={handleEdit}
                                        formFields={formFields}
                                        categoryId={category._id}
                                        key={detail._id}
                                    />
                                ))}
                            </div>
                        ))}
                    </form>
                </section>
            )}
        </div>
    );
};
