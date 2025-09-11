import React from 'react'
import ItemCard from '../Itemcard'


export default function PopularGrid({data}) {
   const items = data?.docs || []
   return (
     <div className="w-full h-full sm:h-[768px] mt-12 sm:mt-20">
       <div className="max-w-7xl mx-auto px-4 sm:px-6">
         <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-center">
           TOP SELLING
         </h2>
 
         <div className="grid grid-cols-2 sm:grid-cols-4 md:gap-6">
           {items.map(({ name, price, originalPrice, rating, imageList }, index) => (
             <ItemCard
               key={index}
               name={name}
               price={price}
               originalPrice={originalPrice}
               rating={rating}
               image={imageList[0].image.url}
             />
           ))}
         </div>
 
         <div className="text-center mt-8">
           <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
             View All
           </button>
         </div>
 
         <div className="flex justify-center mt-10">
           <div className="w-full max-w-7xl h-px bg-gray-300"></div>
         </div>
       </div>
     </div>
   )
 }
 