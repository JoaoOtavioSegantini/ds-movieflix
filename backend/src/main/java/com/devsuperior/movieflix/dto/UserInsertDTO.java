package com.devsuperior.movieflix.dto;

import com.devsuperior.movieflix.services.validation.UserInsertValid;

@UserInsertValid
public class UserInsertDTO extends UserDTO {


	private static final long serialVersionUID = 1L;


	UserInsertDTO() {
		super();
	}


	private String password;


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}



}
