package com.devsuperior.movieflix.services;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.devsuperior.movieflix.dto.EmailDTO;
import com.devsuperior.movieflix.services.exceptions.EmailException;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;


public class SendGridEmailService implements EmailService {

	private static Logger LOG = LoggerFactory.getLogger(SendGridEmailService.class);

	@Autowired
	private SendGrid emailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;

	@Value("${sendgrid.from.email}")
	private String sendgridEmail;

	@Value("${sendgrid.from.name}")
	private String sendgridName;

	@Value("${sendgrid.content.type}")
	private String sendgridType;

	public void sendEmail(EmailDTO dto) {
		try {

			Context context = new Context();
			context.setVariables(dto.getModel());
			//String html = templateEngine.process("email/email-template", context);
			String html = templateEngine.process("email/reset-password-instructions", context);
			dto.setSubject("Password reset request");
			String sendGridSubject = dto.getSubject();
			Email from = new Email(sendgridEmail, sendgridName);
			Email to = new Email(dto.getTo());
			Content content = new Content(sendgridType, html);
			Mail mailer = new Mail(from, sendGridSubject, to, content);

			Request request = new Request();

			request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mailer.build());
			LOG.info("Sending email to " + dto.getTo());
			Response response = emailSender.api(request);
			if (response.getStatusCode() >= 400 && response.getStatusCode() <= 500) {
				throw new EmailException(response.getBody());
			}
			LOG.info("Email sent! Status =" + response.getStatusCode());
		} catch (IOException e) {
			throw new EmailException(e.getMessage());
		}

	}
}
