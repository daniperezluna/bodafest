"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@/Context/ThemeProvider';
import Loading from '@/components/common/Loading';



const LayoutChildren = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
        setTimeout(() => {
            setLoading(false)
        }, 100);
    }, []);
    return <>
        {loading && <Loading />}
        <ThemeProvider>
            {children}
        </ThemeProvider>
    </>
}

export default LayoutChildren