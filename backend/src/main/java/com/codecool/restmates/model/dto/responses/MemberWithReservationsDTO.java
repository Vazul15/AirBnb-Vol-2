package com.codecool.restmates.model.dto.responses;

import java.util.List;

public record MemberWithReservationsDTO(Long id, String firstName, String lastName, String email, String phoneNumber, List<ReservationDTO> reservations) {
}
