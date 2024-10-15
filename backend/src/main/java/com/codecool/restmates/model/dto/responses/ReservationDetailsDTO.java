package com.codecool.restmates.model.dto.responses;

import java.time.LocalDate;

public record ReservationDetailsDTO(LocalDate startDate, LocalDate endDate) {
}
