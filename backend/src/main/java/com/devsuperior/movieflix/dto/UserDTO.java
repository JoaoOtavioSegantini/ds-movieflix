package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.User;

public class UserDTO implements Serializable {


	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "Campo obrigatório!")
	@Email(message = "Email inválido")
	private String email;
	
	@NotBlank(message = "Campo obrigatório!")
	private String name;


	Set<RoleDTO> roles = new HashSet<>();
	
//	private List<ReviewDTO> reviews = new ArrayList<>();


	public UserDTO() {

	}

	public UserDTO(Long id, String email, String name) {
		this.id = id;
		this.email = email;
		this.name = name;
		
	}

	public UserDTO(User entity) {
		id = entity.getId();
		email = entity.getEmail();
		name = entity.getName();
		entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
//		entity.getReviews().forEach(rev -> this.reviews.add(new ReviewDTO(rev)));
	}
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<RoleDTO> getRoles() {
		return roles;
	}
	
	//public List<ReviewDTO> getReviews() {
	//	return reviews;
	//}


}
