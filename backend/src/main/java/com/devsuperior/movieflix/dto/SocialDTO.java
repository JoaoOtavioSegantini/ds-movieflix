package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.devsuperior.movieflix.entities.User;

public class SocialDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull(message = "Campo não pode ser nulo")
    @NotBlank(message = "Campo não pode ficar em branco")
    private String provider;

    @NotNull(message = "Campo não pode ser nulo")
    @NotBlank(message = "Campo não pode ficar em branco")
    private String uid;

    @NotNull(message = "Campo não pode ser nulo")
    @NotBlank(message = "Campo não pode ficar em branco")
    private String idToken;

    private Info info;

    private Set<RoleDTO> roles = new HashSet<>();

    public SocialDTO() {

    }

    public SocialDTO(Long id, String email, String name, String uid, String provider, String image) {
        this.id = id;
        this.info.email = email;
        this.info.name = name;
        this.uid = uid;
        this.provider = provider;
        this.info.image = image;
    }

    public SocialDTO(User entity) {
        id = entity.getId();
        uid = entity.getUid();
        provider = entity.getProvider();
        info.email = entity.getEmail();
        info.name = entity.getName();
        info.image = entity.getImage();
        entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
    }

    public String getIdToken() {
        return idToken;
    }

    public Info getInfo() {
        return info;
    }

    public String getProvider() {
        return provider;
    }

    public String getUid() {
        return uid;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public void setInfo(Info info) {
        this.info = info;
    }

    public Set<RoleDTO> getRoles() {
        return roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public class Info implements Serializable {

        @NotNull(message = "Campo não pode ser nulo")
        @NotBlank(message = "Campo não pode ficar em branco")
        private String name;

        @Email
        @NotBlank(message = "Campo não pode ficar em branco")
        private String email;

        private String image;

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public String getImage() {
            return image;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setImage(String image) {
            this.image = image;
        }
    }

}
