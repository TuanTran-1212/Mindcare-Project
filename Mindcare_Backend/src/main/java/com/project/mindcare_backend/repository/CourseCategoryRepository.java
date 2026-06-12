package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.modal.category.CourseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseCategoryRepository extends JpaRepository<CourseCategory, Integer> {
    boolean existsByName(String name);


    @Query("""
                 SELECT c.id, c.name, c.isActive, c.createdAt, c.updatedAt, COUNT(b.id)
                 FROM CourseCategory c
                 LEFT JOIN c.courses b
                 GROUP BY c.id, c.name, c.isActive, c.createdAt, c.updatedAt
            """)
    List<Object[]> findAllWithCourseCount();

    @Query("""
                SELECT c.id, c.name, c.isActive, c.createdAt, c.updatedAt, COUNT(b.id)
                 FROM CourseCategory c
                 LEFT JOIN c.courses b
                 where c.id = :id
                 GROUP BY c.id, c.name, c.isActive, c.createdAt, c.updatedAt
            """)
    Object[] findbyIdWithCourseCount(@Param("id") Integer id);
}
