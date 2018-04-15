package com.mwroblewski.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "USERS")
@JsonIgnoreProperties(value = {"entries"})
public class User {

    // inner enum - implicitly public static
    public enum Role {
        ROLE_ADMIN, ROLE_USER
    }

    @Id
    @GeneratedValue
    private Long id;
    //authorisation and authorization -> see com.wroblewski.confige.SecurityConfig
    @Column(columnDefinition = "VARCHAR(50)", nullable = false, unique = true)
    private String username;
    @Column(columnDefinition = "VARCHAR(50)", nullable = false)
    private String password;
    @Column(nullable = false)
    private boolean enabled;
    @Column(name = "authority", nullable = false)
    private String role;

    // relation with other table
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profile;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Offer> offers;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Entry> entries;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Message> messages;

    // constructors
    public User() {
    }

    // getter/setter methods
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public boolean isEnabled() {
        return enabled;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Profile getProfile() {
        return profile;
    }
    public void setProfile(Profile profile) {
        this.profile = profile;
    }
    public List<Offer> getOffers() {
        return offers;
    }
    public void setOffers(List<Offer> offers) {
        this.offers = offers;
    }
    public List<Entry> getEntries() {
        return entries;
    }
    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }
    public List<Message> getMessages() {
        return messages;
    }
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}