import { CarProps } from "@/types";
import { FilterProps } from "@/types";
export async function fetchCars(filters:FilterProps) {
  const headers=  {
		'x-rapidapi-key': 'f7e2b2c894mshfd783aca68a9dbap119908jsnc12bbe45b41f',
		'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
    const response =await fetch( 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla',{
        headers:headers,
    });
    const result = await response.json();
    return result
}
export const calculateCarRent = (year: number) => {
  const basePricePerDay = 50; // Base price in dollars
  const ageFactor = 1.5; // Additional rate per year of vehicle age

  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  const ageRate = age / ageFactor;
  const rentalRatePerDay = basePricePerDay + ageRate;

  return rentalRatePerDay.toFixed(0); // Returns a string like "55"
};
export const generateCarImageUrl=(car:CarProps ,angle?:string)=>{
  
}

export const updateSearchParams=(type:string,value:string)=>{
   const searchParams = new URLSearchParams(window.location.search);
    
          searchParams.set(type, value);
    
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        return newPathname;
}