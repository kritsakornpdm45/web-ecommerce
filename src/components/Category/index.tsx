import React from "react";
import Image from "next/image";
import Link from "next/link";

export type CategoryItem = {
  id: string | number;
  title: string;
  image: string;   // path จาก /public หรือ URL ที่อนุญาต
  href?: string;   // ลิงก์ไปยังหน้าหมวดหมู่
};

type Props = {
  items: CategoryItem[];
  className?: string;
};

export default function CategoryGrid({ items, className = "" }: Props) {
  return (
    <section className={`bg-[#0f0f12] text-white py-14 sm:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((it) => (
            <CategoryCard key={it.id} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ item }: { item: CategoryItem }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          priority
        />
      </div>

      <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight">
        {item.title}
      </h3>

      <Link
        href={item.href ?? "#"}
        className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full
                   bg-black text-white hover:bg-neutral-800 transition-colors"
        aria-label={`Shop ${item.title}`}
      >
        Shop Now
      </Link>
    </div>
  );
}
