package com.devsuperior.movieflix.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.EmailDTO;
import com.devsuperior.movieflix.services.EmailService;

@RestController
@RequestMapping(value = "/emails")
public class EmailResource {
	private static Logger LOGGER = LoggerFactory.getLogger(EmailResource.class);

	@Autowired
	EmailService service;

	@PostMapping
	public ResponseEntity<Void> send(@RequestBody EmailDTO dto) {
		LOGGER.info("START METHOD EmailResource.send: {} " + dto.getTo());
		service.sendEmail(dto);
		LOGGER.info("END METHOD EmailResource.send");
		return ResponseEntity.noContent().build();
	}

}
