package com.devsuperior.movieflix.services;

import com.devsuperior.movieflix.dto.EmailDTO;

public interface EmailService {
	void sendEmail(EmailDTO dto);
}
