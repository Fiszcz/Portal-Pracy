package com.mwroblewski.bean;

import com.mwroblewski.bean.Level;

public class TemporaryTechnology {

    private Long id;
    private Level level;
    private String category;

    public TemporaryTechnology() {
    }
    public TemporaryTechnology(Long id, Level level, String category) {
        this.id = id;
        this.level = level;
        this.category = category;
    }
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Level getLevel() {
		return level;
	}
	public void setLevel(Level level) {
		this.level = level;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}

}
