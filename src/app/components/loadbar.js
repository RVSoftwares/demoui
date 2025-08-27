"use client"; // client component
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

export default function ClientLoadingBar() {
    const ref = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            ref.current.continuousStart();
            setTimeout(() => ref.current.complete(), 500);
        }
    }, [pathname]);

    return <LoadingBar color="#ff0000ff" shadow='true' ref={ref} />;
}
