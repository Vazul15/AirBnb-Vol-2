package com.codecool.restmates.model.dto.responses;

public record LessDetailedAccommodationDTO(Long id, String name, String description, Double pricePerNight, LocationCityStateCountryDTO location) {
}
