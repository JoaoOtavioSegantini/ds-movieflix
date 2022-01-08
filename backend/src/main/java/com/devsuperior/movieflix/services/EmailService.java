package com.devsuperior.movieflix.services;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.devsuperior.movieflix.dto.EmailDTO;
import com.devsuperior.movieflix.services.exceptions.EmailException;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class EmailService {
	
	private static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

	
	@Autowired
	private SendGrid sendGrid;
	
	@Value("${sendgrid.from.email}")
	private String sendGridFromEmail;

	@Value("${sendgrid.from.name}")
	private String sendgridFromName;

	@Value("${sendgrid.type}")
	private String sendType;
	
	
	public void sendEmail(EmailDTO dto) {
		Email from = new Email(sendGridFromEmail, sendgridFromName);
		Email to = new Email(dto.getTo());
		Content content = new Content(sendType, dto.getBody());
		Mail mail = new Mail(from, dto.getSubject(), to, content);
		
		Request request = new Request();
		
		try {
			request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mail.build());
			Response response = sendGrid.api(request);
			if (response.getStatusCode() >= 400 && response.getStatusCode() <= 500) {
				LOGGER.error("Error sendind email to" + response.getBody());
				throw new EmailException(response.getBody());
			}
			LOGGER.info("Email sent! Status = " + response.getStatusCode());
			
		}
		catch (IOException e) {
			throw new EmailException(e.getMessage());
		}
	}

}
