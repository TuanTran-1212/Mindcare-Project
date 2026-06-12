package com.project.mindcare_backend.service.implementation;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogCategoryServiceImpl implements BlogCategoryService {

    private final BlogCategoryRepository BlogCategoryRepository;


    @Override
    public List<BlogCategoryResponse> getAll() {
        List<BlogCategory> bookCategories = BlogCategoryRepository.findAll();

        return bookCategories.stream().map(
                BlogCategory -> BlogCategoryResponse.builder()
                        .id(BlogCategory.getId())
                        .name(BlogCategory.getName())
                        .isActive(BlogCategory.isActive())
                        .build()

        ).collect(Collectors.toList());
    }

    @Override
    public BlogCategoryResponse getById(Integer id) {
        BlogCategory BlogCategory = BlogCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("BlogCategory with id: " + id + " not found"));

        return BlogCategoryResponse.builder()
                .id(BlogCategory.getId())
                .name(BlogCategory.getName())
                .isActive(BlogCategory.isActive())
                .build();
    }

    @Override
    public BlogCategoryResponse create(BlogCategoryRequest request) {
        if (BlogCategoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("BlogCategory with name: " + request.getName() + " already exists");
        }

        BlogCategory BlogCategory = new BlogCategory();

        BlogCategory.setName(request.getName());
        BlogCategory.setActive(request.isActive());

        // save to database
        BlogCategory = BlogCategoryRepository.save(BlogCategory);

        //return by response
        return BlogCategoryResponse.builder()
                .id(BlogCategory.getId())
                .name(BlogCategory.getName())
                .isActive(BlogCategory.isActive())
                .build();
    }

    @Override
    public BlogCategoryResponse update(Integer id, BlogCategoryRequest request) {
        BlogCategory BlogCategory = BlogCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book Category with id: " + id + " not found"));

        if (!BlogCategory.getName().equalsIgnoreCase(request.getName())
                && BlogCategoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Book Category with name: " + request.getName() + " already exists");
        }

        BlogCategory.setName(request.getName());
        BlogCategory.setActive(request.isActive());

        BlogCategory = BlogCategoryRepository.save(BlogCategory);

        return BlogCategoryResponse.builder()
                .id(BlogCategory.getId())
                .name(BlogCategory.getName())
                .isActive(BlogCategory.isActive())
                .build();
    }

    @Override
    public void delete(Integer id) {
        BlogCategory BlogCategory = BlogCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("BlogCategory with id: " + id + " not found"));

        BlogCategoryRepository.delete(BlogCategory);

    }
}