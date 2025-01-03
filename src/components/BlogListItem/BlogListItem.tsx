import dayjs from 'dayjs';

type Blog = {
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
      <div>
        <h3>
          <a href={blog.url}>{blog.title}</a>
        </h3>
        <p className="description">{blog.description}</p>
        <p className="post-meta">{postMeta}</p>
      </div>
    );
  });

  return <ul className="post-list">{blogs}</ul>;
}
