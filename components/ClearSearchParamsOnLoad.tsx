"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const ClearSearchParamsOnLoad = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If there are any query parameters on initial load, remove them
    if (searchParams.toString()) {
      router.replace(pathname); // navigates to the same page without params
    }
  }, []);

  return null;
};

export default ClearSearchParamsOnLoad;
