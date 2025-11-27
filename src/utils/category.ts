export interface CategoryItem {
  id: string
  title: string
  image: string
  href: string
}

export const categoryMock: CategoryItem[] = [
  {
    id: "men",
    title: "Man’s Fashion",
    image: "/images/categories/men.jpg",
    href: "/category/mens",
  },
  {
    id: "women",
    title: "Woman’s Fashion",
    image: "/images/categories/women.jpg",
    href: "/category/womens",
  },
  {
    id: "children",
    title: "Children Fashion",
    image: "/images/categories/children.jpg",
    href: "/category/children",
  },
  {
    id: "accessory",
    title: "Accessory",
    image: "/images/categories/accessory.jpg",
    href: "/category/accessories",
  },
];
