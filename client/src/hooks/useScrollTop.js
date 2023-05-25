import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
    const { pathname } = useLocation();
    const previousPathnameRef  = useRef();

    useEffect(() => {
        const excludeRoutes = ['overview', 'info', 'about'];
        const prevPath = previousPathnameRef.current;

        // Check if the previous route is a info/overview subroute
        const isNestedPath = excludeRoutes.some((route) => prevPath?.includes(route));

        // Check if the current route includes "overview" or "info"
        const shouldScrollToTop = !excludeRoutes.some((route) => pathname?.includes(route));

        // Scroll to top if it's not an excluded subroute
        if (!isNestedPath && shouldScrollToTop) {
            window.scrollTo(0, 0);
        }

        previousPathnameRef.current = pathname;
    }, [pathname]);
}
