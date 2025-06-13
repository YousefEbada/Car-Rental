"use client"
import { CarProps } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { calculateCarRent } from '@/utils'
import CarDetails from './CarDetails'

interface CarCardProps {
  car: CarProps
}

const CarCard = ({ car }: CarCardProps) => {
  const {
    city_mpg,
    class: car_class,
    combination_mpg,
    cylinders,
    displacement,
    drive,
    fuel_type,
    highway_mpg,
    make,
    model,
    transmission,
    year,
  } = car
  const image=`https://cdn.imagin.studio/getimage?customer=demo&make=${make}&modelFamily=${model}&modelYear=${year}`
  // Generate fallback MPG if needed
  const cityMpgValue =
    typeof city_mpg === 'number'
      ? city_mpg
      : Math.floor(Math.random() * (35 - 15 + 1)) + 15 // 15 to 35 MPG

  const carRent = calculateCarRent(year)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='car-card group'>
      <div className='car-card__content'>
        <h2 className='car-card__content-title'>{make} {model}</h2>
      </div>
      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>
      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={image} alt="hero" fill priority className='object-contain' />
      </div>
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src="/steering-wheel.svg" width={20} height={20} alt="steering wheel" />
            <p className='text-[14px] leading-[17px]'>
              {transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src="/tire.svg" width={20} height={20} alt="tire" />
            <p className='text-[14px] leading-[17px]'>
              {drive.toUpperCase()}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src="/gas.svg" width={20} height={20} alt="gas" />
            <p className='text-[14px] leading-[17px]'>
              {cityMpgValue} MPG
            </p>
          </div>
        </div>
        <div className='car-card__btn-container'>
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon="/right-arrow.svg"
            handleClick={() => {setIsOpen(true)}}
          />
        </div>
      </div>
      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} image={image} />
    </div>
  )
}

export default CarCard
