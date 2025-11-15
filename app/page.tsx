import { Suspense } from "react";
import { Hero } from "@/components";
import ClearSearchParamsOnLoad from "@/components/ClearSearchParamsOnLoad";
import CarCatalogue from "@/components/CarCatalogue";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Suspense fallback={null}>
        <ClearSearchParamsOnLoad />
      </Suspense>
      <Hero />
      <Suspense fallback={<div className="mt-12 padding-x padding-y max-width">Loading...</div>}>
        <CarCatalogue />
      </Suspense>
    </main>
  );
}
