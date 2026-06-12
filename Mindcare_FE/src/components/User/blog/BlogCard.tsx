import { Link } from "react-router-dom";

import type { BlogPost } from "../../../data/Types";

const BlogCard = ({id, thumbnail, title, description}:BlogPost) => {
  return (
    <>
      <div className="blog-card" key={id}>
        <Link to={`/blog`}>
          <img src={thumbnail} alt={title} className="blog-image" />
        </Link>
        <div className="blog-content">
          <h3>{title}</h3>
          <p>
            {description}
          </p>
          <Link to={`/blog/${id}`} className="read-more"> 
            Read More
          </Link>
        </div>
      </div> 
    </>
  );
};
export default BlogCard;
