package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.dto.response.BookResponse;
import com.project.mindcare_backend.modal.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    //getAll kèm category
    @Query("select b from Book b left join fetch b.category")
    List<Book> findAllWithCategory();

    // Lấy sách chưa bị xoá (isDeleted = false) cùng category
    @Query("""
                    select b from Book b
                     left join fetch b.category
                     where b.isDeleted = false
            """)
    List<BookResponse> findByIsDeletedFalse();

    //lây book theo id có category
    @Query("""
                    select b from Book b
                    left join fetch b.category
                    where b.id = :id
            """)
    Optional<Book> findByIdWithCategory(@Param("id") Integer id);

    //lây book theo id có category (not delete)
    @Query("""
                   select b from Book b
                   left join fetch b.category
                   where b.id = :id
                   and b.isDeleted = false
            """)
    Optional<Book> findByIdWithCategoryNotDeleted(@Param("id") Integer id);


    // Lấy sách còn trong kho (stock > 0)
    List<Book> findByStockGreaterThanAndIsDeletedFalse(Integer stock);

    @Modifying
    @Query("update Book b set b.isDeleted = true where b.id = :id")
    void softDeletedById(@Param("id") Integer id);

    @Modifying
    @Query("update Book b set b.isDeleted = false where b.id = :id")
    void restoreById(@Param("id") Integer id);
}
