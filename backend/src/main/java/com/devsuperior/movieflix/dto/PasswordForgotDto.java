package com.devsuperior.movieflix.dto;

import java.io.Serializable;

public class PasswordForgotDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private String token;

	private String password;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
