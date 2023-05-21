package com.devsuperior.movieflix.services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.devsuperior.movieflix.dto.EmailDTO;
import com.devsuperior.movieflix.entities.PasswordResetToken;
import com.devsuperior.movieflix.entities.User;

@Service
public class MailContentBuilder {

    private SpringTemplateEngine templateEngine;

    @Value(value = "${frontend.server.name}")
    private String url;

    @Autowired
    public MailContentBuilder(SpringTemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String generateForgotPasswordMailContent(PasswordResetToken token, EmailDTO dto, User user) {
        Context context = new Context();
        Locale local = new Locale("pt", "BR");
        DateFormat formatDate = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss", local);
        String expiryDate = formatDate.format(token.getExpiryDate());

        Map<String, Object> model = new HashMap<>();
        model.put("expiryDate", expiryDate);
        model.put("user", user);
        model.put("url", url);
        model.put("resetUrl", url + "/reset-password?token=" + token.getToken());
        dto.setSubject("Password reset request");
        dto.setModel(model);
        context.setVariables(dto.getModel());

        return templateEngine.process("email/reset-password-instructions", context);
    }

}
