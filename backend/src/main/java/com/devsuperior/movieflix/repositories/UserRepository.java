package com.devsuperior.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devsuperior.movieflix.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);

	User findUserByProviderAndUid(String provider, String uid);

	@Modifying
	@Query("update User u set u.password = :password where u.id = :id")
	void updatePassword(@Param("password") String password, @Param("id") Long id);

}
