package com.devsuperior.movieflix.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.devsuperior.movieflix.services.validation.UserInsertValid;

@UserInsertValid
public class UserInsertDTO extends UserDTO {

	private static final long serialVersionUID = 1L;

	UserInsertDTO() {
		super();
	}

	@NotBlank(message = "Campo não pode estar em branco")
	@NotNull(message = "Campo não pode ser nulo")
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
