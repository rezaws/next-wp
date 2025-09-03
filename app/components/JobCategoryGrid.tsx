// components/CategoryGrid.tsx
import Image from 'next/image'
import { Category } from '../helpers/category'
import resolveIcon from '../helpers/icon-resolve'

async function getCategories(): Promise<Category[]> {
  const res = await fetch('http://localhost:10010/wp-json/wp/v2/categories?include=1,4,3,5,6,7&_fields=id,name,slug,icon', {
    next: { revalidate: 60 }, // مشابه getStaticProps با revalidate
  });
  return res.json();
}       

export default async function jobCategory () {
  const categories = await getCategories();

  return (
<div className="w-full py-8 bg-gray-50">
<h2 className="text-center text-2xl font-bold mb-6">Job Categories</h2>
    <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">  
        {categories.map((cat) => (
        <div key={cat.id} className="h-[160px]">
          <div className="h-full flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-md">
            <Image
             src={resolveIcon(cat.icon)}
             alt={cat.name}
             width={50}
             height={50}
             className="mb-2"
            />
            <span className="text-sm font-medium text-center leading-tight truncate w-full p-2">
             {cat.name}
            </span>
          </div>
        </div>
        ))}
    </div>
</div>
  );
};
