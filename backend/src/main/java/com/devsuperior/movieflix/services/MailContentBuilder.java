package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.devsuperior.movieflix.entities.PasswordResetToken;

@Service
public class MailContentBuilder {
	private TemplateEngine templateEngine;

    @Autowired
    public MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String generateMailContent(PasswordResetToken client) {
        Context context = new Context();
        context.setVariable("name", client.getUser().getName());
        context.setVariable("email", client.getUser().getEmail());
        context.setVariable("token", client.getToken());
        context.setVariable("contact", client.getExpiryDate());
        
        return templateEngine.process("mailTemplate", context);
    }
}
