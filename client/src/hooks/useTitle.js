import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `Where Do I Go | ${title || ':)'}`;
        }
    }, [title]);
};
