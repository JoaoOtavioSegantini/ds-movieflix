package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;

import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.dto.UserInsertDTO;
import com.devsuperior.movieflix.entities.PasswordResetToken;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.entities.VerificationToken;

public interface IUserService {
	UserDTO insert(UserInsertDTO accountDto);

	User getUser(String verificationToken);

	void saveRegisteredUser(User user);

	void deleteUser(User user);

	void createVerificationTokenForUser(User user, String token);

	VerificationToken getVerificationToken(String VerificationToken);

	VerificationToken generateNewVerificationToken(String token);

	void createPasswordResetTokenForUser(User user, String token);

	User findUserByEmail(String email);

	PasswordResetToken getPasswordResetToken(String token);

	Optional<User> getUserByPasswordResetToken(String token);

	Optional<User> getUserByID(long id);

	void changeUserPassword(User user, String password);

	boolean checkIfValidOldPassword(User user, String password);

	String validateVerificationToken(String token);

//	String generateQRUrl(User user) throws UnsupportedEncodingException;

//	User updateUser2FA(boolean use2FA);

	List<String> getUsersFromSessionRegistry();

//	NewLocationToken isNewLoginLocation(String username, String ip);

//	String isValidNewLocationToken(String token);

//	void addUserLocation(User user, String ip);
}
