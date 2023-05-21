package com.devsuperior.movieflix.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.devsuperior.movieflix.services.EmailService;
import com.devsuperior.movieflix.services.SendGridEmailService;

@Configuration
@Profile("dev")
public class DevConfig {

	@Bean
	public EmailService emailService() {
		return new SendGridEmailService();
	}

}
