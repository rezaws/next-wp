import Image from 'next/image';

interface Post {
  id: number;
  title: { rendered: string };
  date: string;
  author: number;
  featured_media: number;
}

interface Author {
  id: number;
  name: string;
}

interface Media {
  id: number;
  source_url: string;
}

export default async function LatestPosts() {
  // گرفتن آخرین ۳ پست
  const postsRes = await fetch('http://localhost:10010/wp-json/wp/v2/posts?per_page=3&_embed');
  const posts: Post[] = await postsRes.json();

  return (
    <div className="w-full py-8 bg-gray-50">
    <h2 className="text-center text-2xl font-bold mb-6">Latest Posts</h2>
    <div className="max-w-4xl mx-auto grid grid-cols-3 md:grid-cols-3 gap-6">
      {posts.map(post => {
        const image = (post as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        const author = (post as any)._embedded?.author?.[0]?.name;

        return (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
            {image && (
              <Image
                src={image}
                alt={post.title.rendered}
                width={400}
                height={200}
                className="rounded-md mb-3"
              />
            )}
            <h3 className="text-xl font-semibold mb-1">{post.title.rendered}</h3>
            <p className="text-gray-500 text-sm">
              🖊️ {author} | 📅 {new Date(post.date).toLocaleDateString('fa-IR')}
            </p>
          </div>
        );
      })}
    </div>
    </div>
  )
}
