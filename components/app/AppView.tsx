import styles from "./AppView.module.scss";
import { AppWithStringDate, PostWithStringDate } from "../../lib/db";
import { marked } from "marked";

interface PostProps {
  app: AppWithStringDate;
}
export const AppComponent: React.FC<PostProps> = ({
  app,
}: {
  app: AppWithStringDate;
}) => {
  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <h2>{app.name}</h2>
        <p>{marked.parseInline(app.description)}</p>
        <a href={`/app/${app.slug}`}>
          <button className="arrow-right">LEARN MORE</button>
        </a>
      </div>
      <div className={styles.pusher}></div>
      <img src={app.image} alt={`The preview image of the app ${app.name}`} />
    </div>
  );
};
