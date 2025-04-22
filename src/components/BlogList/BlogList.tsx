import { useState, useEffect } from 'react';
import BlogListItem from '../BlogListItem';

import './BlogList.css';

export function BlogList() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    const articlesUrl = 'https://dev.to/api/articles?username=louis7';

    async function startFetching() {
      const response = await fetch(articlesUrl);

      if (!ignore) {
        setBlogList(await response.json());
      }
    }

    let ignore = false;
    startFetching();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="blog-list-container">
      <BlogListItem blogItems={blogList}></BlogListItem>
    </div>
  );
}
