package com.codecool.restmates.model.dto.responses;

public record FullAccommodationWithLocationIdCityStateCountryDTO(Long id, String name, String description, Integer roomNumber, Double pricePerNight, Integer maxGuests, LocationIdCityStateCountryDTO location) {
}
