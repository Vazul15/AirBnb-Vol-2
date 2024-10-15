package com.codecool.restmates.model.dto.responses;

public record FullAccommodationDTO(Long id, String name, String description, Integer roomNumber, Double pricePerNight, Integer maxGuests, LocationCityStateCountryDTO location) {
}
