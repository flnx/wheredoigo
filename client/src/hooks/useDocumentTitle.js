import { useEffect } from 'react';

export const useDocumentTitle = (title = '') => {
    const siteName = 'Where Do I Go';
    const updatedTitle = `${siteName} | ${title}`;

    useEffect(() => {
        // the test env doesnt provide document object
        if (typeof document === 'undefined') {
            return;
        }
        
        if (document.title !== updatedTitle) {
            document.title = updatedTitle;
        }
        

        return () => {
            document.title = siteName;
        };
    }, [title]);
};