import styles from "./PostView.module.scss";
import { PostWithStringDate } from "../../lib/db";
import { marked } from "marked";

interface PostProps {
  post: PostWithStringDate;
}
export const PostComponent: React.FC<PostProps> = ({
  post,
}: {
  post: PostWithStringDate;
}) => {
  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <h2>{post.title}</h2>
        <p>{marked.parseInline(post.description)}</p>
        <a href={`/post/${post.slug}`}>
          <button className="arrow-right">CLICK TO READ</button>
        </a>
      </div>
      <div className={styles.pusher}></div>
      <img src={post.image} alt={`The image of the post ${post.title}`} />
    </div>
  );
};
