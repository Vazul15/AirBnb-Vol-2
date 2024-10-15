package com.codecool.restmates.service;

import com.codecool.restmates.exception.MemberNotFoundException;
import com.codecool.restmates.model.dto.requests.NewReservationWithBothIDsDTO;
import com.codecool.restmates.model.dto.responses.ReservationDTO;
import com.codecool.restmates.exception.ResourceNotFoundException;
import com.codecool.restmates.model.entity.Accommodation;
import com.codecool.restmates.model.entity.Member;
import com.codecool.restmates.model.entity.Reservation;
import com.codecool.restmates.repository.AccommodationRepository;
import com.codecool.restmates.repository.MemberRepository;
import com.codecool.restmates.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final AccommodationRepository accommodationRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, AccommodationRepository accommodationRepository, MemberRepository memberRepository) {
        this.reservationRepository = reservationRepository;
        this.accommodationRepository = accommodationRepository;
        this.memberRepository = memberRepository;
    }

    public ReservationDTO getReservationById(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);

        if (reservation.isPresent()) {
            Reservation reservationEntity = reservation.get();

            return convertToDTO(reservationEntity);
        } else {
            throw new ResourceNotFoundException(String.format("Reservation with id %s not found!", reservationId));
        }
    }

    public List<ReservationDTO> getAllReservationsByMemberEmail(String memberEmail) {
        Optional<Member> member = memberRepository.findByEmail(memberEmail);

        if (!member.isPresent()) {
            throw new MemberNotFoundException("Member with email " + memberEmail + " not found.");
        }

        Member foundMember = member.get();

        List<Reservation> reservations = reservationRepository.findAllByMemberId(foundMember.getId());


        List<ReservationDTO> reservationsByMember = reservations.stream()
                .map(this::convertToDTO)
                .toList();

        return reservationsByMember;
    }

    public Long createReservation(NewReservationWithBothIDsDTO newReservation) {
        String memberEmail = newReservation.memberEmail();
        Long accommodationId = newReservation.accommodationId();

        Member guest = memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with email: " + memberEmail));

        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation not found with id: " + accommodationId));

        if (isOverlapping(newReservation.startDate(), newReservation.endDate(), accommodationId)) {
            throw new IllegalArgumentException("The selected date range is already booked.");
        }

        Reservation reservation = new Reservation();
        reservation.setStartDate(newReservation.startDate());
        reservation.setEndDate(newReservation.endDate());
        reservation.setAccommodation(accommodation);
        reservation.setMember(guest);
        reservation.setValue(newReservation.value());

        reservationRepository.save(reservation);

        return reservation.getId();
    }

    private boolean isOverlapping(LocalDate startDate, LocalDate endDate, Long accommodationId) {
        List<Reservation> existingReservations = reservationRepository.findAllByAccommodationId(accommodationId);

        for (Reservation reservation : existingReservations) {
            LocalDate existingStartDate = reservation.getStartDate();
            LocalDate existingEndDate = reservation.getEndDate();

            if (startDate.isBefore(existingEndDate) && endDate.isAfter(existingStartDate)) {
                return true;
            }
        }

        return false;
    }

    public Boolean deleteReservation(Long reservationId) {
        if (reservationRepository.existsById(reservationId)) {
            reservationRepository.deleteById(reservationId);
            return true;
        } else {
            throw new ResourceNotFoundException("Reservation not found with id: " + reservationId);
        }
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        return new ReservationDTO(
                reservation.getStartDate(),
                reservation.getEndDate(),
                reservation.getAccommodation().getName(),
                reservation.getValue()
        );
    }
}
