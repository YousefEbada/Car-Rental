"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SearchBar, CustomFilter, CarCard, ShowMore } from "@/components";
import { mockCars } from "@/mockData";
import { fuels, yearsOfProduction } from "@/constants";

const CarCatalogue = () => {
  const searchParams = useSearchParams();

  const manufacturerParam = searchParams.get("manufacturer")?.toLowerCase() || "";
  const modelParam = searchParams.get("model")?.toLowerCase() || "";
  const fuelParam = searchParams.get("fuel")?.toLowerCase() || "";
  const yearParam = parseInt(searchParams.get("year") || "") || 0;
  const limit = parseInt(searchParams.get("limit") || "") || 12;

  const filteredCars = useMemo(() => {
    return mockCars.filter((car) => {
      const carModel = car.model?.toLowerCase() || "";
      const carMake = car.make?.toLowerCase() || "";
      const carFuel = car.fuel_type?.toLowerCase() || "";
      const carYear = car.year;

      const matchesModel = modelParam ? carModel.includes(modelParam) : true;
      const matchesMake = manufacturerParam ? carMake.includes(manufacturerParam) : true;
      const matchesFuel = fuelParam ? carFuel === fuelParam : true;
      const matchesYear = yearParam ? carYear === yearParam : true;

      return matchesMake && matchesModel && matchesFuel && matchesYear;
    });
  }, [manufacturerParam, modelParam, fuelParam, yearParam]);

  const carsToShow = filteredCars.slice(0, limit);
  const isDataEmpty = !Array.isArray(filteredCars) || filteredCars.length < 1;

  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>The cars you are looking for</p>
      </div>

      <div className="home__filters">
        <SearchBar />
        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
      </div>

      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {carsToShow.map((car, index) => (
              <div key={`${car.model}-${index}`}>
                <CarCard car={car} />
              </div>
            ))}
          </div>

          {limit < filteredCars.length && (
            <ShowMore
              pageNumber={limit / 12}
              isNext={limit >= filteredCars.length}
            />
          )}
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
        </div>
      )}
    </div>
  );
};

export default CarCatalogue;

