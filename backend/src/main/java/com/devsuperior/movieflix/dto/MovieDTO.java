package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.devsuperior.movieflix.entities.Movie;

public class MovieDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@Size(max = 60, message = "O campo título deve ter no máximo 60")
	@NotBlank(message = "Campo não pode estar em branco")
	@NotNull(message = "Campo não pode ser nulo")
	private String title;

	@Size(min = 5, max = 100, message = "O campo subtítulo deve ter no mínimo 5 letras e no máximo 100")
	private String subTitle;

	@NotNull(message = "Campo não pode ser nulo")
	private Integer year;

	@NotNull(message = "Campo não pode ser nulo")
	@NotBlank(message = "Campo não pode estar em branco")
	private String imgUrl;

	@Size(min = 20, message = "O campo da descrição deve ter no mínimo 20 letras")
	private String synopsis;

	@NotNull(message = "Campo não pode ser nulo")
	private Long genreId;

	private Set<ReviewDTO> reviews = new HashSet<>();

	public MovieDTO() {

	}

	public MovieDTO(Long id, String title, String subTitle, Integer year, String imgUrl, String synopsis,
			Long genreId) {

		this.id = id;
		this.title = title;
		this.subTitle = subTitle;
		this.year = year;
		this.imgUrl = imgUrl;
		this.synopsis = synopsis;
		this.genreId = genreId;
	}

	public MovieDTO(Movie entity) {

		this.id = entity.getId();
		this.title = entity.getTitle();
		this.subTitle = entity.getSubTitle();
		this.year = entity.getYear();
		this.imgUrl = entity.getImgUrl();
		this.synopsis = entity.getSynopsis();
		this.genreId = entity.getGenre().getId();
		entity.getReviews().forEach(rev -> this.reviews.add(new ReviewDTO(rev)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}

	public Set<ReviewDTO> getReviews() {
		return reviews;
	}

	public Long getGenreId() {
		return genreId;
	}

	public void setGenreId(Long genreId) {
		this.genreId = genreId;
	}

}
