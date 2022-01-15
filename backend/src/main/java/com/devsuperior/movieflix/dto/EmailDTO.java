package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.Map;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class EmailDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String from;
	
	@Email
	@NotBlank
	private String to;
	
	private String subject;
	private Map<String, Object> model;

	public EmailDTO() {

	}

	public EmailDTO(String from, String to, String subject, Map<String, Object> model) {
		super();
		this.from = from;
		this.to = to;
		this.subject = subject;
		this.model = model;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public Map<String, Object> getModel() {
		return model;
	}

	public void setModel(Map<String, Object> model) {
		this.model = model;
	}

}
