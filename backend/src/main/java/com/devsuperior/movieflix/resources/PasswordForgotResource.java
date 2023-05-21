package com.devsuperior.movieflix.resources;

import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.EmailDTO;
import com.devsuperior.movieflix.dto.PasswordForgotDto;
import com.devsuperior.movieflix.entities.PasswordResetToken;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.PasswordResetTokenRepository;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.EmailService;
import com.devsuperior.movieflix.services.MailContentBuilder;
import com.devsuperior.movieflix.services.UserService;
import com.devsuperior.movieflix.services.exceptions.EmailException;

@RestController
@RequestMapping(value = "/emails")
public class PasswordForgotResource {

	@Autowired
	private PasswordResetTokenRepository tokenRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private UserRepository repository;

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Value(value = "${frontend.server.name}")
	private String url;

	@Autowired
	MailContentBuilder mailContentBuilder;

	@PostMapping
	public ResponseEntity<Void> send(@RequestBody @Valid EmailDTO dto) {

		User user = repository.findByEmail(dto.getTo());
		if (user == null) {
			throw new EmailException("O usuário " + dto.getTo() + " não foi encontrado.");
		}

		PasswordResetToken token = new PasswordResetToken();
		token.setToken(UUID.randomUUID().toString());
		token.setUser(user);
		token.setExpiryDate(30);
		tokenRepository.save(token);

		String html = mailContentBuilder.generateForgotPasswordMailContent(token, dto, user);

		emailService.sendEmail(dto, html);

		return ResponseEntity.ok().build();

	}

	@PostMapping(value = "/reset")
	public ResponseEntity<Void> reset(@RequestBody PasswordForgotDto dto) {
		PasswordResetToken resetToken = tokenRepository.findByToken(dto.getToken());
		if (resetToken == null) {
			throw new EmailException("Token não encontrado: " + dto.getToken());
		}

		if (dto.getPassword() == null) {
			throw new EmailException("O password é obrigatório!");
		}
		Long id = resetToken.getUser().getId();
		String updatedPassword = passwordEncoder.encode(dto.getPassword());
		userService.updatePassword(updatedPassword, id);
		tokenRepository.delete(resetToken);

		return ResponseEntity.noContent().build();

	}
}
