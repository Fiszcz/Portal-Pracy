package com.mwroblewski.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "CITIES")
@JsonIgnoreProperties(value = "offers")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "VARCHAR(50)", nullable = false, unique = true)
    private String name;

    // relations with other tables
    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL)
    private List<Offer> offers;

    // constructors
    public City() {
    }
    public City(String name) {
        this.name = name;
    }
    public City(String name, List<Offer> offers) {
        this.name = name;
        this.offers = offers;
    }

    // getter/setter methods
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<Offer> getOffers() {
        return offers;
    }
    public void setOffers(List<Offer> offers) {
        this.offers = offers;
    }
}
