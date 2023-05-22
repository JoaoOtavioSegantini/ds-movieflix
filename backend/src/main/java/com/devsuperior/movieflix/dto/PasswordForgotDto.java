package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class PasswordForgotDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotNull(message = "Campo não pode ser nulo")
	@NotBlank(message = "Campo não pode ficar em branco")
	private String token;

	@NotNull(message = "Campo não pode ser nulo")
	@NotBlank(message = "Campo não pode ficar em branco")
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
