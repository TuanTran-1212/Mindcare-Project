//get data
import { blogs } from "../../../data/Blog";

//get component, use it by interface


// get blogs data type
import type { BlogPost } from "../../../data/Types";

// reuseable grid | props: items[], renderItem(), columns, gap
import Items from "../../../components/User/common/itemList/ItemList";

// arrow pagination | props: currentPage, totalPages, onPageChange
import { PaginationNumbers } from "../../../components/User/common/pagination/Pagination";

// custom hook to logic pagination | return: items (trang hiện tại), currentPage, totalPages, goToPage
import { usePagination } from "../../../utilis/usePagination";
import { Link } from "react-router-dom";



/**
 * ListBlog - Trang hiển thị toàn bộ danh sách bài viết blog
 * Được render tại route: /blog
 */
const ListBlog = () => {
  // Gọi hook usePagination với toàn bộ mảng blogs và 6 items mỗi trang
  // Hook sẽ tự tính: tổng trang, items của trang hiện tại, hàm chuyển trang
  const {
    items: currentBlogs, // mảng blog của trang đang xem (tối đa 6 phần tử)
    currentPage, // số trang hiện tại (bắt đầu từ 1)
    totalPages, // tổng số trang = ceil(7 / 6) = 2
    goToPage, // hàm: (page: number) => void, dùng để chuyển trang
  } = usePagination(blogs, 6);
  return (
    <>
      <div className="container">
        <h1 className="blog-title">
          Tin Tức{" "}
          <span style={{ color: "#10b981", fontSize: 52 }}>MINDCARE</span>
        </h1>
        {/* Blog Posts Section */}
        <section className="blog-posts">
          {/*
          Items<BlogPost> — generic grid, render từng blog thành BlogCard
          columns={3}     — 3 cột desktop (CSS grid: repeat(3, 1fr))
          gap="2rem"      — khoảng cách giữa các card
          renderItem      — hàm nhận 1 BlogPost, trả về JSX
          {...blog}       — spread toàn bộ fields: id, image, title, description, date
        */}
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
        </section>
        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationNumbers
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            // onPageChange nhận hàm goToPage từ usePagination
            // Khi click số trang → goToPage(page) → hook cập nhật currentPage
            // → React re-render → currentBlogs thay đổi → Items hiển thị trang mới
          />
        )}
      </div>
    </>
  );
};
export default ListBlog;
