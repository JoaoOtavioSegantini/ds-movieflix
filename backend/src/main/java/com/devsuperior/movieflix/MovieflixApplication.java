package com.devsuperior.movieflix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;

@SpringBootApplication
public class MovieflixApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieflixApplication.class, args);
	}

	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();

	}

}
