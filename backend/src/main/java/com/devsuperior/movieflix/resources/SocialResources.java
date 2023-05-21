package com.devsuperior.movieflix.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.movieflix.components.CustomTokenGenerator;
import com.devsuperior.movieflix.dto.SocialDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.services.UserService;

@RestController
@RequestMapping(value = "/api/v1/social_auth/callback")
public class SocialResources {

	@Autowired
	private UserService service;

	@Autowired
	private CustomTokenGenerator tokenGenerator;

	@PostMapping
	public ResponseEntity<OAuth2AccessToken> insert(@Valid @RequestBody SocialDTO dto) {
		UserDTO newDto = service.social(dto);
		OAuth2AccessToken token = tokenGenerator.generateToken(newDto.getEmail(), newDto.getName(), newDto.getId());
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(token);
	}

}
