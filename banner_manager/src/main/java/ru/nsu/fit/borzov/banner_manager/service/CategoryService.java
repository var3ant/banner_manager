package ru.nsu.fit.borzov.banner_manager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nsu.fit.borzov.banner_manager.dto.AddCategoryDto;
import ru.nsu.fit.borzov.banner_manager.dto.CategoryPreview;
import ru.nsu.fit.borzov.banner_manager.dto.UpdateCategoryDto;
import ru.nsu.fit.borzov.banner_manager.exception.AlreadyExistException;
import ru.nsu.fit.borzov.banner_manager.exception.ConflictException;
import ru.nsu.fit.borzov.banner_manager.exception.NotFoundException;
import ru.nsu.fit.borzov.banner_manager.model.Banner;
import ru.nsu.fit.borzov.banner_manager.model.Category;
import ru.nsu.fit.borzov.banner_manager.repository.BannerRepository;
import ru.nsu.fit.borzov.banner_manager.repository.CategoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class CategoryService {
    final CategoryRepository categoryRepository;
    final BannerRepository bannerRepository;
    final Logger logger = Logger.getLogger(this.getClass().getName());

    public void add(AddCategoryDto dto) throws AlreadyExistException {
        logger.info("trying to add " + dto);

        Category categoryWithSameName = categoryRepository.findByName(dto.getName());
        if (categoryWithSameName != null) {
            throw new AlreadyExistException("Category with the same Name already exists");
        }

        Category categoryWithSameReqName = categoryRepository.findByReqName(dto.getReqName());
        if (categoryWithSameReqName != null) {
            throw new AlreadyExistException("Category with the same Request ID already exists");
        }

        Category category = new Category();
        category.setName(dto.getName());
        category.setReqName(dto.getReqName());

        categoryRepository.save(category);
    }

    public List<CategoryPreview> getPreviewList() {
        logger.info("get preview list");
        return categoryRepository.getAllPreviews();
    }

    public void delete(Long id) throws NotFoundException, ConflictException {
        logger.info("trying to delete Category with id:" + id);
        Optional<Category> maybeCategory = categoryRepository.findById(id);
        if (!maybeCategory.isPresent()) {
            throw new NotFoundException("Category with id '" + id + "' not found");
        }

        List<Banner> existingBanners = bannerRepository.findByCategoryId(id);
        if (!existingBanners.isEmpty()) {
            List<String> errors = new ArrayList<>();

            StringBuilder sb = new StringBuilder();
            sb.append("Banners with id: '").append(existingBanners.get(0).getId()).append("'");
            for(int i = 1; i < existingBanners.size(); i++) {
                Banner banner = existingBanners.get(i);
                sb.append(", '").append(banner.getId()).append("'");
            }
            errors.add(sb.append(" refs to this category").toString());

            throw new ConflictException(errors);
        }

        Category category = maybeCategory.get();
        category.setDeleted(true);
        categoryRepository.save(category);
    }

    public List<CategoryPreview> search(String searchField) {
        logger.info("search for categories with pattern: " + searchField);
        return categoryRepository.findByNamePart(searchField);
    }

    public void update(UpdateCategoryDto dto) throws AlreadyExistException, NotFoundException {
        logger.info("trying to update " + dto);

        Optional<Category> maybeCategory = categoryRepository.findById(dto.getId());
        if (!maybeCategory.isPresent()) {
            throw new NotFoundException("Category with id '" + dto.getId() + "' not found");
        }

        Category categoryWithSameName = categoryRepository.findByName(dto.getName());
        if (categoryWithSameName != null && !Objects.equals(categoryWithSameName.getId(), dto.getId())) {
            throw new AlreadyExistException("Category with the same Name already exists");
        }

        Category categoryWithSameReqName = categoryRepository.findByReqName(dto.getReqName());
        if (categoryWithSameReqName != null && !Objects.equals(categoryWithSameReqName.getId(), dto.getId())) {
            throw new AlreadyExistException("Category with the same Request ID already exists");
        }


        Category category = maybeCategory.get();
        category.setName(dto.getName());
        category.setReqName(dto.getReqName());
        categoryRepository.save(category);
    }

    public Category get(Long id) throws NotFoundException {
        logger.info("trying to get Category by id: " + id);
        Optional<Category> maybeCategory = categoryRepository.findById(id);
        if (maybeCategory.isPresent()) {
            return maybeCategory.get();
        }
        throw new NotFoundException("Category with id '" + id + "' not found");
    }
}
