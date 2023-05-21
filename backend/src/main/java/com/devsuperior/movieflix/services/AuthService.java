package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.exceptions.ForbiddenException;
import com.devsuperior.movieflix.services.exceptions.UnauthorizedException;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	private static final String ROLE_ADMIN = "ROLE_ADMIN";
	private static final String MSG = "Access denied";

	public User authenticated() {
		try {
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRepository.findByEmail(username);
		} catch (Exception err) {
			throw new UnauthorizedException("Invalid user");
		}
	}

	public void validateSelfOrAdmin(Long userId) {
		User user = authenticated();
		if (!user.getId().equals(userId) && !user.hasHole(ROLE_ADMIN)) {
			throw new ForbiddenException(MSG);
		}
	}

	public void validateMemberOrAdmin() {
		User user = authenticated();
		if (!user.hasHole("MEMBER") && !user.hasHole(ROLE_ADMIN)) {
			throw new ForbiddenException(MSG);
		}
	}

	public void validateAdmin() {
		User user = authenticated();
		if (!user.hasHole(ROLE_ADMIN)) {
			throw new ForbiddenException(MSG);
		}
	}

}
