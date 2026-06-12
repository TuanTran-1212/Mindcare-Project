package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.modal.category.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookCategoryRepository extends JpaRepository<BookCategory, Integer> {
    boolean existsByName(String name);


    @Query("""
                 SELECT c.id, c.name, c.isActive, c.createdAt, c.updatedAt, COUNT(b.id)
                 FROM BookCategory c
                 LEFT JOIN c.books b
                 GROUP BY c.id, c.name, c.isActive, c.createdAt, c.updatedAt
            """)
    List<Object[]> findAllWithBookCount();

    @Query("""
                SELECT c.id, c.name, c.isActive, c.createdAt, c.updatedAt, COUNT(b.id)
                 FROM BookCategory c
                 LEFT JOIN c.books b
                 where c.id = :id
                 GROUP BY c.id, c.name, c.isActive, c.createdAt, c.updatedAt
            """)
    Object[] findbyIdWithBookCount(@Param("id") Integer id);
}