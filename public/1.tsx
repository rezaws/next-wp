'use client'

import { useEffect, useState } from 'react';
import Header from './components/header';

export default function JobsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:10004/wp-json/wp/v2/jobs')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <>
    <Header />
    <div className="max-w-4xl mx-auto p-4">
      {posts.map(post => (
        <div key={post.id} className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold">{post.title.rendered}</h2>
      <p className="text-gray-600">شرکت: {post.content.rendered}</p>
        </div>
      ))}
    </div>
    </>
  );
}