package com.codecool.restmates.service;

import com.codecool.restmates.model.dto.requests.LocationDTO;
import com.codecool.restmates.model.dto.requests.NewAccommodationDTO;
import com.codecool.restmates.model.dto.requests.UpdateAccommodationDTO;
import com.codecool.restmates.model.dto.responses.*;
import com.codecool.restmates.exception.ResourceNotFoundException;
import com.codecool.restmates.model.entity.Accommodation;
import com.codecool.restmates.model.entity.Location;
import com.codecool.restmates.model.entity.Member;
import com.codecool.restmates.repository.AccommodationRepository;
import com.codecool.restmates.repository.LocationRepository;
import com.codecool.restmates.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AccommodationService {
    private final AccommodationRepository accommodationRepository;
    private final LocationRepository locationRepository;
    private final MemberRepository memberRepository;

    public List<LessDetailedAccommodationDTO> getAllAccommodations() {
        List<Accommodation> accommodations = accommodationRepository.findAll();

        return accommodations.stream().map(this::convertToLessDetailedDTO).toList();
    }

    public AccommodationDTO getAccommodationById(Long accommodationId) {
        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation not found"));

        Location location = accommodation.getLocation();

        LocationDTO locationDTO = new LocationDTO(
                location.getId(),
                location.getStreet(),
                location.getCity(),
                location.getState(),
                location.getCountry(),
                location.getZipCode()
        );

        return new AccommodationDTO(
                accommodation.getName(),
                accommodation.getDescription(),
                accommodation.getRoomNumber(),
                accommodation.getPricePerNight(),
                accommodation.getMaxGuests(),
                locationDTO
        );
    }

    public List<LessDetailedAccommodationDTO> searchAccommodationByCityAndCountry(String query) {
        List<Accommodation> accommodations = accommodationRepository.findByLocationCityStartingWithIgnoreCaseOrLocationCountryStartingWithIgnoreCase(query, query);


        return accommodations.stream()
                .map(accommodation -> new LessDetailedAccommodationDTO(
                        accommodation.getId(),
                        accommodation.getName(),
                        accommodation.getDescription(),
                        accommodation.getPricePerNight(),
                        new LocationCityStateCountryDTO(accommodation.getLocation().getCity(), accommodation.getLocation().getState(), accommodation.getLocation().getCountry())
                ))
                .toList();
    }

    public List<LessDetailedAccommodationDTO> getAllAccommodationsByMember(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            Long memberId = member.get().getId();
            List<Accommodation> accommodations = accommodationRepository.findAll();

            return accommodations.stream()
                    .filter(accommodation -> accommodation.getOwner().getId().equals(memberId))
                    .map(accommodation -> convertToLessDetailedDTO(accommodation))
                    .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException(String.format("Member with email %s not found!", email));
        }
    }


    public Long createAccommodation(NewAccommodationDTO newAccommodation, String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            Location createdLocation = new Location(
                    newAccommodation.location().street(),
                    newAccommodation.location().city(),
                    newAccommodation.location().state(),
                    newAccommodation.location().country(),
                    newAccommodation.location().zipCode()
            );

            locationRepository.save(createdLocation);

            Accommodation accommodation = new Accommodation();
            accommodation.setName(newAccommodation.name());
            accommodation.setDescription(newAccommodation.description());
            accommodation.setRoomNumber(newAccommodation.roomNumber());
            accommodation.setPricePerNight(newAccommodation.pricePerNight());
            accommodation.setMaxGuests(newAccommodation.maxGuests());
            accommodation.setLocation(createdLocation);
            accommodation.setOwner(member.get());

            accommodationRepository.save(accommodation);

            return accommodation.getId();
        } else {
            throw new ResourceNotFoundException(String.format("Member with email %s not found!", email));
        }
    }

    public Long updateAccommodation(Long accommodationId, UpdateAccommodationDTO updateAccommodation, String email) {
        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation not found with id: " + accommodationId));

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Member with email %s not found!", email)));

        Location updatedLocation = new Location(
                updateAccommodation.location().street(),
                updateAccommodation.location().city(),
                updateAccommodation.location().state(),
                updateAccommodation.location().country(),
                updateAccommodation.location().zipCode()
        );

        locationRepository.save(updatedLocation);

        accommodation.setName(updateAccommodation.name());
        accommodation.setDescription(updateAccommodation.description());
        accommodation.setRoomNumber(updateAccommodation.roomNumber());
        accommodation.setPricePerNight(updateAccommodation.pricePerNight());
        accommodation.setMaxGuests(updateAccommodation.maxGuests());
        accommodation.setLocation(updatedLocation);
        accommodation.setOwner(member);

        accommodationRepository.save(accommodation);

        return accommodation.getId();
    }

    public Boolean deleteAccommodation(Long accommodationId, String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            if (accommodationRepository.existsById(accommodationId)) {
                accommodationRepository.deleteById(accommodationId);
                return true;
            } else {
                throw new ResourceNotFoundException("Accommodation not found with id: " + accommodationId);
            }
        } else {
            throw new ResourceNotFoundException(String.format("Member with email %s not found!", email));
        }
    }

    private LessDetailedAccommodationDTO convertToLessDetailedDTO(Accommodation accommodation) {
        LocationCityStateCountryDTO locationDTO = new LocationCityStateCountryDTO(
                accommodation.getLocation().getCity(),
                accommodation.getLocation().getState(),
                accommodation.getLocation().getCountry()
        );

        return new LessDetailedAccommodationDTO(
                accommodation.getId(),
                accommodation.getName(),
                accommodation.getDescription(),
                accommodation.getPricePerNight(),
                locationDTO
        );
    }
}
