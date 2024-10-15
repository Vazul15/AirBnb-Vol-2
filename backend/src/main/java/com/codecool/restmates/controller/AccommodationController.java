package com.codecool.restmates.controller;

import com.codecool.restmates.model.dto.requests.NewAccommodationDTO;
import com.codecool.restmates.model.dto.requests.UpdateAccommodationDTO;
import com.codecool.restmates.model.dto.responses.AccommodationDTO;
import com.codecool.restmates.model.dto.responses.LessDetailedAccommodationDTO;
import com.codecool.restmates.service.AccommodationService;
import com.codecool.restmates.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/api/accommodation")
@AllArgsConstructor
public class AccommodationController {
    private final AccommodationService accommodationService;

    private final ImageService imageService;

    @PostMapping(path = "/{accommodationId}/image")
    public ResponseEntity<?> uploadImage (
            @PathVariable Long accommodationId,
            @RequestParam("image") MultipartFile file
    ) throws IOException {
        String uploadResult = imageService.uploadImageForAccommodation(file, accommodationId);

        return ResponseEntity.status(HttpStatus.OK).body(uploadResult);
    }

    @GetMapping(path = "/{accommodationId}/images")
    public ResponseEntity<List<String>> downloadImage(@PathVariable Long accommodationId) throws IOException {
        List<String> images = imageService.downloadImagesOfAccommodation(accommodationId);

        return ResponseEntity.status(HttpStatus.OK).body(images);
    }

    @GetMapping(path = "/all")
    public List<LessDetailedAccommodationDTO> getAllAccommodations() {
        return accommodationService.getAllAccommodations();
    }

    @GetMapping(path = "/{accommodationId}")
    public AccommodationDTO getAccommodationById(@PathVariable Long accommodationId) {
        return accommodationService.getAccommodationById(accommodationId);
    }

    @GetMapping(path = "/all-by-member")
    public List<LessDetailedAccommodationDTO> getAllAccommodationsByMember(
            Authentication authentication
    ) {
        String email = authentication.getName();
        return accommodationService.getAllAccommodationsByMember(email);
    }

    @PostMapping(path = "")
    public Long createAccommodation(
            @RequestBody NewAccommodationDTO newAccommodation,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return accommodationService.createAccommodation(newAccommodation, email);
    }

    @PutMapping(path = "/{accommodationId}")
    public Long updateAccommodation(
            @PathVariable Long accommodationId,
            @RequestBody UpdateAccommodationDTO updateAccommodation,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return accommodationService.updateAccommodation(accommodationId, updateAccommodation, email);
    }

    @DeleteMapping(path = "/{accommodationId}")
    public Boolean deleteAccommodation(
            @PathVariable Long accommodationId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return accommodationService.deleteAccommodation(accommodationId, email);
    }

    @GetMapping("/search")
    public List<LessDetailedAccommodationDTO> searchAccommodationByCountryAndCity(@RequestParam String query) {
        return accommodationService.searchAccommodationByCityAndCountry(query);
    }



}
