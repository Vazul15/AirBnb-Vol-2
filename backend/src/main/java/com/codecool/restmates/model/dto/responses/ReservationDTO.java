package com.codecool.restmates.model.dto.responses;

import java.time.LocalDate;

public record ReservationDTO(LocalDate startDate, LocalDate endDate, String accommodationName, Double value) {
}
