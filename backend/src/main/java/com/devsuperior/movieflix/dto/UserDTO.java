package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.devsuperior.movieflix.entities.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo obrigatório!")
	@Email(message = "Email inválido")
	private String email;

	@NotBlank(message = "Campo obrigatório!")
	private String name;

	@NotNull(message = "Campo não pode ser nulo")
	private Set<RoleDTO> roles = new HashSet<>();

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

}
