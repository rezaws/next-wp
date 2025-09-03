
type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
};

export default async function Posts() {

  const res = await fetch('http://localhost:10004/wp-json/wp/v2/posts');
  const posts: Post[] = await res.json();

  return (
    <div>
      <h2>آخرین پست‌ها</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
