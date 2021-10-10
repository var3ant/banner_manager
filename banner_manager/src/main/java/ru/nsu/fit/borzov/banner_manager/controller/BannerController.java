package ru.nsu.fit.borzov.banner_manager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.nsu.fit.borzov.banner_manager.dto.AddBannerDto;
import ru.nsu.fit.borzov.banner_manager.dto.BannerPreview;
import ru.nsu.fit.borzov.banner_manager.dto.ResponseBannerDto;
import ru.nsu.fit.borzov.banner_manager.dto.UpdateBannerDto;
import ru.nsu.fit.borzov.banner_manager.exception.AlreadyExistException;
import ru.nsu.fit.borzov.banner_manager.exception.NotFoundException;
import ru.nsu.fit.borzov.banner_manager.model.Banner;
import ru.nsu.fit.borzov.banner_manager.service.BannerService;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequiredArgsConstructor
@RequestMapping("/banner")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BannerController {
    final BannerService bannerService;
    final Logger logger = Logger.getLogger(this.getClass().getName());

    @PostMapping(produces = "application/json")
    public Long add(@Validated @RequestBody AddBannerDto addBannerDto) throws NotFoundException, AlreadyExistException {
        return bannerService.add(addBannerDto);
    }

    @PutMapping(produces = "application/json")
    public void add(@Validated @RequestBody UpdateBannerDto dto) throws NotFoundException, AlreadyExistException {
        bannerService.update(dto);
    }


    @GetMapping(path = "/previews")
    public List<BannerPreview> getPreviewList() {
        return bannerService.getPreviewList();
    }

    @GetMapping(value = "/{id}")
    public ResponseBannerDto get(@NotNull @PathVariable Long id) throws NotFoundException {
        Banner b = bannerService.get(id);
        ResponseBannerDto toReturn = new ResponseBannerDto();
        toReturn.setCategoryId(b.getCategory().getId());
        toReturn.setName(b.getName());
        toReturn.setPrice(b.getPrice());
        toReturn.setId(b.getId());
        toReturn.setText(b.getText());
        return toReturn;
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable Long id) throws NotFoundException {
        bannerService.delete(id);
    }

    @GetMapping("/search")
    public List<BannerPreview> search(@NotNull @RequestParam("v") String searchField) {
        return bannerService.search(searchField);
    }
}
