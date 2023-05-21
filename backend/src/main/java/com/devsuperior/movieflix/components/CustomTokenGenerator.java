package com.devsuperior.movieflix.components;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Component;

@Component
public class CustomTokenGenerator {

    @Autowired
    private DefaultTokenServices tokenService;

    @Autowired
    JwtTokenEnhancer jwtTokenEnhancer;

    @Autowired
    TokenStore tokenStore;

    @Value("${security.oauth2.client.client-id}")
    private String clientId;

    @Value("${jwt.duration}")
    private Integer jwtDuration;

    public OAuth2AccessToken generateToken(String username, String name, Long id) {

        HashMap<String, String> authorizationParameters = new HashMap<>();
        authorizationParameters.put("scope", "read");
        authorizationParameters.put("username", username);
        authorizationParameters.put("client_id", clientId);
        authorizationParameters.put("grant_type", "password");

        Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("VISITOR"));

        Set<String> responseType = new HashSet<>();
        responseType.add("password");

        Set<String> scopes = new HashSet<>();
        scopes.add("read");
        scopes.add("write");

        OAuth2Request authorizationRequest = new OAuth2Request(
                authorizationParameters, clientId,
                authorities, true, scopes, null, "",
                responseType, null);

        User userPrincipal = new User(username, "", true, true, true, true, authorities);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userPrincipal, null, authorities);

        OAuth2Authentication authenticationRequest = new OAuth2Authentication(
                authorizationRequest, authenticationToken);
        authenticationRequest.setAuthenticated(true);

        OAuth2AccessToken accessToken = tokenService.createAccessToken(authenticationRequest);
        OAuth2AccessToken token = tokenEnhancer(accessToken, name, id);

        // Salve o token no token store
        tokenStore.storeAccessToken(token, authenticationRequest);
        return token;
    }

    public OAuth2AccessToken tokenEnhancer(OAuth2AccessToken accessToken, String name, Long id) {
        Map<String, Object> map = new HashMap<>();
        map.put("userName", name);
        map.put("userId", id);

        DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) accessToken;
        token.setExpiration(new Date(Date.from(Instant.now()).getTime() + jwtDuration * 1000));
        token.setAdditionalInformation(map);

        return accessToken;
    }
}
