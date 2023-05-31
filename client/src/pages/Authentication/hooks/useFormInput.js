import { useState } from 'react';

export const useFormInput = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        username: '',
    });

    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return [state, onChangeHandler];
};
