package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.modal.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findAllByIsDeletedFalse();

    @Query("select b from Book b left join fetch b.bookCategory")
    List<Book> findAllWithCategory();
}
