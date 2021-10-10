package ru.nsu.fit.borzov.banner_manager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nsu.fit.borzov.banner_manager.dto.AddBannerDto;
import ru.nsu.fit.borzov.banner_manager.dto.BannerPreview;
import ru.nsu.fit.borzov.banner_manager.dto.UpdateBannerDto;
import ru.nsu.fit.borzov.banner_manager.exception.AlreadyExistException;
import ru.nsu.fit.borzov.banner_manager.exception.NoContentException;
import ru.nsu.fit.borzov.banner_manager.exception.NotFoundException;
import ru.nsu.fit.borzov.banner_manager.model.Banner;
import ru.nsu.fit.borzov.banner_manager.model.Category;
import ru.nsu.fit.borzov.banner_manager.model.Request;
import ru.nsu.fit.borzov.banner_manager.repository.BannerRepository;
import ru.nsu.fit.borzov.banner_manager.repository.CategoryRepository;
import ru.nsu.fit.borzov.banner_manager.repository.RequestRepository;

import java.util.*;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class BannerService {
    final BannerRepository bannerRepository;
    final CategoryRepository categoryRepository;
    final RequestRepository requestRepository;
    final Logger logger = Logger.getLogger(this.getClass().getName());

    public Long add(AddBannerDto dto) throws NotFoundException, AlreadyExistException {
        logger.info("trying to add " + dto);
        Banner banner = new Banner();
        Optional<Category> category = categoryRepository.findById(dto.getCategoryId());
        if (!category.isPresent()) {
            throw new NotFoundException("Category with id '" + dto.getCategoryId() + "' not found");
        }

        Banner bannerWithSameName = bannerRepository.findByName(dto.getName());
        if (bannerWithSameName != null) {
            throw new AlreadyExistException("Banner with the same Name already exists");
        }


        banner.setCategory(categoryRepository.getById(dto.getCategoryId()));
        banner.setName(dto.getName());
        banner.setPrice(dto.getPrice());
        banner.setText(dto.getText());


        Long toReturn = bannerRepository.save(banner).getId();
        logger.info("added successfully " + dto);
        return toReturn;
    }

    public List<BannerPreview> getPreviewList() {
        logger.info("get preview list");
        return bannerRepository.getAllPreviews();
    }

    public void update(UpdateBannerDto dto) throws NotFoundException, AlreadyExistException {
        logger.info("trying to update " + dto);
        Optional<Banner> maybeBanner = bannerRepository.findById(dto.getId());
        if (!maybeBanner.isPresent()) {
            throw new NotFoundException("Banner with id '" + dto.getId() + "' not found");
        }

        Banner bannerWithSameName = bannerRepository.findByName(dto.getName());
        if (bannerWithSameName != null && !Objects.equals(bannerWithSameName.getId(), dto.getId())) {
            throw new AlreadyExistException("Banner with the same Name already exists");
        }

        Optional<Category> maybeCategory = categoryRepository.findById(dto.getCategoryId());
        if (!maybeCategory.isPresent()) {
            throw new NotFoundException("Category with id '" + dto.getCategoryId() + "' not found");
        }


        Banner banner = maybeBanner.get();
        banner.setText(dto.getText());
        banner.setName(dto.getName());
        banner.setPrice(dto.getPrice());
        banner.setCategory(maybeCategory.get());


        bannerRepository.save(banner);
    }

    public Banner get(Long id) throws NotFoundException {
        logger.info("trying to get Banner by id:" + id);
        Optional<Banner> banner = bannerRepository.findById(id);
        if (banner.isPresent()) {
            return banner.get();
        }
        throw new NotFoundException("Banner with id '" + id + "' not found");
    }

    public String userRequest(String reqName, String address, String userAgent) throws NoContentException {
        logger.info("user request: ' reqName: " + reqName + ", address: " + address + ", userAgent: " + userAgent + " '");


        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR, -24);
        Date maximumPermissibleDateOfLastRequest = new Date(calendar.getTimeInMillis());
        List<Banner> banners = bannerRepository.getRelevantBanner(reqName, userAgent, address, maximumPermissibleDateOfLastRequest);

        Date date = new Date();
        Request request = new Request();
        request.setDate(date);
        request.setIpAddress(address);
        request.setUserAgent(userAgent);

        if (banners.isEmpty()) {
            request.setBanner(null);
            requestRepository.save(request);
            throw new NoContentException("");
        }

        Banner banner = banners.get(0);
        request.setBanner(banner);
        requestRepository.save(request);

        return banner.getText();
    }

    public void delete(Long id) throws NotFoundException {
        logger.info("trying to delete Banner with id:" + id);

        Optional<Banner> maybeBanner = bannerRepository.findById(id);
        if (!maybeBanner.isPresent()) {
            throw new NotFoundException("Banner with id '" + id + "' not found");
        }

        Banner banner = maybeBanner.get();
        banner.setDeleted(true);
        bannerRepository.save(banner);
    }

    public List<BannerPreview> search(String searchField) {
        logger.info("search for Banners with pattern: " + searchField);

        return bannerRepository.findByNamePart(searchField);
    }
}
