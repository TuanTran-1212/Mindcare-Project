// src/components/TeamSection/TeamSection.tsx
import type { BlogPost } from "../../../data/Types";
import { PaginationArrows } from "../common/pagination/Pagination";
import { usePagination } from "../../../utilis/usePagination";
import Items from "../common/itemList/ItemList";

import { Link } from "react-router-dom";

interface BlogPostSectionProps {
  blogs: BlogPost[];
  itemsPerPage?: number;
}

/**
 * Component hiển thị sách với phân trang
 * Sử dụng Items để tái sử dụng
 */
const BlogPostSection = ({ blogs, itemsPerPage = 4 }: BlogPostSectionProps) => {
  const {
    items: currentBlogs,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(blogs, itemsPerPage);

  return (
    <>
      <section className="blog-news">
        <div className="row">
          <div className="col-12">
            <div className="blog-news-top">
              <div className="blog-news-title">
                <p className="head-title">Blog &amp; News</p>
                <h2>
                  Our Latest <span className="text-font">Blog</span> &amp; News
                </h2>
              </div>
              <button type="button" className="blog-view-all-btn">
                View All
              </button> 
            </div>
          </div> 
        </div>
        <div className="container" style={{ maxWidth: 1150 }}>
          <div className="row" id="blog-grid">
            <Items<BlogPost>
              items={currentBlogs}
              columns={3} // 3 cột mỗi hàng
              gap="1rem"
              renderItem={(blog) => (
                <Link to="">
                  {" "}
                  {/*blog detail */}
                  <article
                    className="blog-news-item"
                    style={{ backgroundImage: `url(${blog.thumbnail})` }}
                  >
                    <div className="overlay-blog">
                      <div className="blog-news-item-title">
                        <h4>{blog.title}</h4>
                        <p>
                          <i className="fa-solid fa-clock" />
                          <span>{blog.date}</span>
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              )}
            />
          </div>
          {/* pagination */}
          {totalPages > 1 && (
            <PaginationArrows
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPostSection;
