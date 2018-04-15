package com.mwroblewski.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ENTRIES")
@JsonIgnoreProperties(value = {"offer"})
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone = "Europe/Warsaw")
    @Column(nullable = false)
    @Temporal(value = TemporalType.DATE)
    private Date applied;

    // relation with other tables
    @ManyToOne
    private User user;
    @ManyToOne
    private Offer offer;

    // constructors
    public Entry() {
    }

    // getter/setter methods
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Date getApplied() {
        return applied;
    }
    public void setApplied(Date applied) {
        this.applied = applied;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Offer getOffer() {
        return offer;
    }
    public void setOffer(Offer offer) {
        this.offer = offer;
    }
}