package com.codecool.restmates.controller;

import com.codecool.restmates.model.dto.requests.LocationDTO;
import com.codecool.restmates.model.dto.responses.LocationResponseDTO;
import com.codecool.restmates.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/location")
public class LocationController {
    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping(path = "/{locationId}")
    public LocationResponseDTO getLocationById(@PathVariable Long locationId) {
        return locationService.getLocationById(locationId);
    }

    @PostMapping(path = "")
    public Long createLocation(@RequestBody LocationDTO newLocation) {
        return locationService.createLocation(newLocation);
    }

    @PutMapping(path = "/{locationId}")
    public Long updateLocation(@PathVariable Long locationId, @RequestBody LocationDTO newLocation) {
        return locationService.updateLocation(locationId, newLocation);
    }

    @DeleteMapping(path = "/{locationId}")
    public Boolean deleteLocation(@PathVariable Long locationId) {
        return locationService.deleteLocation(locationId);
    }
}
