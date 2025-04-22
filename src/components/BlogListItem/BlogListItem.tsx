import './BlogListItem.css';
import dayjs from 'dayjs';

type Blog = {
  id: number;
  type_of: string;
  title: string;
  description: string;
  url: string;
  reading_time_minutes: number;
  published_at: string;
  public_reactions_count: number;
};

export function BlogListItem({ blogItems }: { blogItems: Array<never> }) {
  const blogs = blogItems.map((blog: Blog) => {
    const publishedDate = new Date(blog.published_at);
    const postMeta = [
      `${blog.reading_time_minutes} minutes`,
      `${dayjs(publishedDate).format('MMM D, YYYY')}`,
      `${blog.public_reactions_count} reactions`,
    ].join(' · ');
    return (
      <div key={blog.id} id={blog.id.toString()} className='blog-list-item'>
        <h5 className='title'>
          <a href={blog.url}>{blog.title}</a>
        </h5>
        {/* <span className="description">{blog.description}</span> */}
        <span className="post-meta">{postMeta}</span>
      </div>
    );
  });

  return <ul className="post-list">{blogs}</ul>;
}
