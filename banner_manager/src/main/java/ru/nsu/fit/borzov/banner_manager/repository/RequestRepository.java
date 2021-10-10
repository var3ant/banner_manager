package ru.nsu.fit.borzov.banner_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nsu.fit.borzov.banner_manager.dto.CategoryPreview;
import ru.nsu.fit.borzov.banner_manager.model.Category;
import ru.nsu.fit.borzov.banner_manager.model.Request;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

}