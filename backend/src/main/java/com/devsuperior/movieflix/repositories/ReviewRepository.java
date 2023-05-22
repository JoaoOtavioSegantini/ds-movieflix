package com.devsuperior.movieflix.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	@Query("SELECT obj FROM Review obj WHERE obj.user = :user")
	List<Review> findMyReviews(User user);

	@Query("SELECT obj FROM Review obj JOIN FETCH obj.movie WHERE obj IN :reviews")
	List<Review> findMyReviews(List<Review> reviews);
}

// @Query(value = "SELECT obj.id, obj.user_id, obj.movie_id, obj.text,
// mov.img_url, "
// + "mov.sub_title, mov.title FROM TB_REVIEW obj INNER JOIN TB_MOVIE mov"
// + " ON obj.movie_id = mov.id WHERE obj.user_id = :id"
// + " GROUP BY obj.id", nativeQuery = true)
// List<Review> findMyReviews(@Param("id") Long id);
