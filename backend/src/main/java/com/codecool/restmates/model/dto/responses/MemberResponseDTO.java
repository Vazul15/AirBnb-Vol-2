package com.codecool.restmates.model.dto.responses;

import java.util.List;

public record MemberResponseDTO(String firstName, String lastName, String email, String phoneNumber, List<FullAccommodationDTO> accommodations, List<ReservationDTO> reservations) {
}
