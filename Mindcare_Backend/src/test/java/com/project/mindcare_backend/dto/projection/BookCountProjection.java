package com.project.mindcare_backend.dto.projection;

public interface BookCountProjection {
    Integer getId();
    String getName();
    String getStatus();
    Long getBookCount();
}
