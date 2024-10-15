package com.codecool.restmates.repository;

import com.codecool.restmates.model.entity.Accommodation;
import com.codecool.restmates.model.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByLocationCityStartingWithIgnoreCaseOrLocationCountryStartingWithIgnoreCase(String cityPrefix, String countryPrefix);
}
