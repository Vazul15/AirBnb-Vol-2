package com.codecool.restmates.repository;

import com.codecool.restmates.model.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByAccommodationId(Long accommodationId);
    List<Reservation> findAllByMemberId(Long memberId);
}
