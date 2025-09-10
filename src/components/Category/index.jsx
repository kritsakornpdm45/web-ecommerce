import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryGrid({ data, className = "" }) {
  const items = data?.docs || [];

  return (
    <section className={`bg-[#0f0f12] text-white py-14 sm:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <h2 className=" text-gray-100 text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-center">
          CATEGORY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map(({ id, name, slug, image }) => (
            <CategoryCard
              key={id}
              id={id}
              title={name}
              href={`/categories/${slug}`}
              image={image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ id, title, href, image }) {
  const imageUrl = typeof image === "object" && image?.url ? image.url : image;

  return (
    <div
      className="flex flex-col items-center text-center bg-[#1a1a1d] 
                 rounded-2xl shadow-lg overflow-hidden 
                 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* รูปสินค้า */}
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={title}
          fill
          className="object-contain"
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          priority
        />
      </div>

      {/* เนื้อหา */}
      <div className="p-6 flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h3>

        <Link
          href={href ?? "#"}
          className="mt-4 inline-flex items-center justify-center px-6 py-2.5 rounded-full
                     border border-white text-white font-medium
                     hover:bg-gray-100 hover:text-black
                     transition-colors duration-200"
          aria-label={`Shop ${title}`}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
