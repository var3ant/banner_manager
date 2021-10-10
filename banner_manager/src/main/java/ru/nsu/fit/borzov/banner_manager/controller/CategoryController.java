package ru.nsu.fit.borzov.banner_manager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.nsu.fit.borzov.banner_manager.dto.AddCategoryDto;
import ru.nsu.fit.borzov.banner_manager.dto.CategoryPreview;
import ru.nsu.fit.borzov.banner_manager.dto.UpdateCategoryDto;
import ru.nsu.fit.borzov.banner_manager.exception.AlreadyExistException;
import ru.nsu.fit.borzov.banner_manager.exception.ConflictException;
import ru.nsu.fit.borzov.banner_manager.exception.NotFoundException;
import ru.nsu.fit.borzov.banner_manager.model.Category;
import ru.nsu.fit.borzov.banner_manager.service.CategoryService;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoryController {
    final CategoryService categoryService;
    final Logger logger = Logger.getLogger(this.getClass().getName());

    @PostMapping(produces = "application/json")
    public void add(@Validated @RequestBody AddCategoryDto addDto) throws AlreadyExistException {
        categoryService.add(addDto);
    }

    @PutMapping(produces = "application/json")
    public void update(@Validated @RequestBody UpdateCategoryDto dto) throws AlreadyExistException, NotFoundException {
        categoryService.update(dto);
    }


    @GetMapping(path = "/previews")
    public List<CategoryPreview> getPreviewList() {
        return categoryService.getPreviewList();
    }

    @GetMapping(path="/{id}")
    public Category get(@NotNull @PathVariable Long id) throws NotFoundException {
        return categoryService.get(id);
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@NotNull @PathVariable Long id) throws NotFoundException, ConflictException {
        categoryService.delete(id);
    }

    @GetMapping("/search")
    public List<CategoryPreview> search(@NotNull @RequestParam("v") String searchField) {
        return categoryService.search(searchField);
    }
}
