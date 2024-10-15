package com.codecool.restmates.model.dto.responses;

import com.codecool.restmates.model.dto.requests.LocationDTO;

public record AccommodationDTO(String name, String description, Integer roomNumber, Double pricePerNight, Integer maxGuests, LocationDTO location) {
}
