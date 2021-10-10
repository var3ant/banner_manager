package ru.nsu.fit.borzov.banner_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nsu.fit.borzov.banner_manager.dto.CategoryPreview;
import ru.nsu.fit.borzov.banner_manager.model.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.isDeleted = FALSE")
    List<CategoryPreview> getAllPreviews();

    @Query("SELECT c FROM Category c WHERE :name = c.name AND c.isDeleted = FALSE")
    Category findByName(String name);

    @Query("SELECT c FROM Category c WHERE :reqName = c.reqName AND c.isDeleted = FALSE")
    Category findByReqName(String reqName);

    @Query("SELECT c FROM Category c WHERE ( LOWER(c.name) LIKE LOWER(CONCAT('%', :part,'%')) OR LOWER(c.reqName) LIKE LOWER(CONCAT('%', :part,'%')) ) AND c.isDeleted = FALSE")
    List<CategoryPreview> findByNamePart(String part);

}


//    @Query("SELECT (count(c) = 0) FROM Category c WHERE :id <> c.id AND (:name = c.name OR :reqName = c.reqName) AND c.isDeleted = FALSE")
//    boolean checkUniq(Long id, String name, String reqName);

//    @Query("SELECT (count(c) = 0) FROM Category c WHERE (:name = c.name OR :reqName = c.reqName) AND c.isDeleted = FALSE")
//    boolean checkUniq(String name, String reqName);