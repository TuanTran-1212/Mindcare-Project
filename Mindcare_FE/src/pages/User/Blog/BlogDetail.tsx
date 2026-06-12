//get data
import { blogs } from "../../../data/Blog";

// useParams: hook của react-router-dom để đọc giá trị dynamic segment từ URL
// VD: URL là "/blog/3" → useParams() trả về { id: "3" } | id được lấy luôn là string
import { useParams, Link } from "react-router-dom";
//component các thẻ blog cho related blogs
import BlogCard from "../../../components/User/blog/BlogCard";




/**
 * BlogDetail — Trang chi tiết 1 bài blog
 * Route: /blog/:id  (VD: /blog/3)
 *
 * Luồng hoạt động:
 *   1. User click "Đọc Thêm" trong BlogCard → Link to="/blog/3"
 *   2. Routes.tsx match route "blog/:id" → render BlogDetail
 *   3. useParams() đọc id = "3" từ URL
 *   4. blogs.find() tìm blog có id === 3 trong data
 *   5. Render nội dung blog đó
 */
const Blog = () => {
  //useParams() trả về { id: "3" } nên dùng {id} thay vì id(trả về object)
  const { id } = useParams<{ id: string }>();

  //tìm blog trong data theo id
  const blog = blogs.find((b) => b.id === Number(id));

  // lấy blog liên quan trừ blog hiện tại
  const relatedBlogs = blogs.filter((b) => b.id !== Number(id)).slice(0, 3);

  // ── Xử lý trường hợp không tìm thấy blog (gõ sai/id ko tồn tại)
  // thay thế khi dùng api
  if (!blog) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Bài viết không tồn tại</h2>
        <Link to="/blog" style={{ color: "#10b981", fontWeight: 600 }}>
          ← Quay lại Blog
        </Link>
      </div>
    );
  }
  return (
    <>
    <div className="blogPage">
      
    </div>
      <section className="container blog-detail">
        <div className="blog-post">
          <div className="blog-header">
            <img
              src={blog.thumbnail}
              alt={blog.title || "thumbnail blog"}
              className="blog-image-large"
            />
            <div className="blog-meta">
              <h1 className="blog-title-detail">{blog.title}</h1>
              <div className="blog-author-date">
                <span className="author">{blog.author}</span>
                <span className="date">{blog.date}</span>
              </div>
            </div>
          </div>
          <div className="blog-content">
            {blog.contentBlock?.map((content, idx) => {
              if (content.type === "paragraph")
                return <p key={idx}>{content.text}</p>;

              if (content.type === "image")
                return (
                  <img
                    key={idx}
                    src={content.src}
                    alt={content.alt}
                    className="blog-content-image"
                  />
                );

              if (content.type === "heading")
                return <h2 key={idx}>{content.text}</h2>;

              if (content.type === "quote")
                return (
                  <blockquote
                    style={{
                      fontSize: 28,
                      background: "#f8f9fa",
                      padding: 20,
                      borderLeft: "5px solid #2e7d32",
                      margin: "30px 0",
                      fontStyle: "italic",
                    }}
                  >
                    "{content.text}"
                    <cite
                      style={{
                        display: "block",
                        marginTop: 10,
                        fontWeight: "bold",
                      }}
                    >
                      - {content.src}
                    </cite>
                  </blockquote>
                );
              return null;
            })}
          </div>
        </div>
        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <section className="related-blogs">
            <h3 
              style={{
                textAlign: "center",
                marginBottom: 30,
                color: "var(--text)",
                fontSize: "2rem",
                fontWeight: 700,
              }}
            >
              Related Blogs
            </h3>
            <div className="row">
              {relatedBlogs.map((blog, idx)=>(
                <div className="col-md-4" key={idx}>
                    <BlogCard {...blog}/>
              </div>
              ))}
              
              
            </div>
          </section>
        )}
      </section>
    </>
  );
};
export default Blog;
