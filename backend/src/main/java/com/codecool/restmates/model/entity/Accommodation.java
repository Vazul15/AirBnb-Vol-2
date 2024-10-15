package com.codecool.restmates.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "accommodation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Accommodation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer roomNumber;

    private Double pricePerNight;

    private Integer maxGuests;

    @Enumerated(EnumType.STRING)
    private AccommodationType accommodationType;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Member owner;

    @OneToMany(mappedBy = "accommodation", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "accommodation", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Image> images;
}
