package com.codecool.restmates.model.dto.requests;

public record UpdateAccommodationDTO(String name, String description, Integer roomNumber, Double pricePerNight, Integer maxGuests, LocationDTO location) {
}
