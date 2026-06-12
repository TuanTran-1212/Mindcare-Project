package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.dto.response.BookCategoryResponse;
import com.project.mindcare_backend.enums.StatusEnum;
import com.project.mindcare_backend.modal.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookCategoryRepository extends JpaRepository<BookCategory, Integer> {
    boolean existsByName(String name);
    List<BookCategory> findByStatus(StatusEnum status);

    @Query("""
                SELECT
                    c.id as id,
                    c.name as name,
                    COUNT(b.id) AS bookCount,
                    c.status as status
                from BookCategory c
                left join c.books b
                group by c.id, c.name
            """)
    List<BookCategoryResponse> findAllWithBookCount();
}