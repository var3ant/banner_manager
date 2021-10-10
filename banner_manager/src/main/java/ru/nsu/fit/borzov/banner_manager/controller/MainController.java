package ru.nsu.fit.borzov.banner_manager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import ru.nsu.fit.borzov.banner_manager.exception.NoContentException;
import ru.nsu.fit.borzov.banner_manager.service.BannerService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MainController {
    @Value("${message.ping}")
    String message;
    final BannerService bannerService;

    @GetMapping("/ping")
    public String ping() {
        return message;
    }


    @GetMapping("/bid")
    public String get(@NotNull @RequestParam("category") String reqName, HttpServletRequest request, @RequestHeader(value = "User-Agent") String userAgent) throws NoContentException {
        String address = request.getRemoteAddr();
        return bannerService.userRequest(reqName, address, userAgent);
    }
}
