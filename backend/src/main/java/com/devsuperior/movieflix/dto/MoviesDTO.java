package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.devsuperior.movieflix.entities.Movie;

public class MoviesDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@Size(max = 60, message = "O campo título deve ter no máximo 60")
	@NotBlank(message = "Campo obrigatório")
	private String title;

	@NotBlank(message = "Campo obrigatório")
	@Size(min = 5, max = 100, message = "O campo subtítulo deve ter no mínimo 5 letras e no máximo 100")
	private String subTitle;

	@NotNull(message = "Campo obrigatório")
	private Integer year;

	@NotBlank(message = "Campo obrigatório")
	private String imgUrl;

	@NotBlank(message = "Campo obrigatório")
	@Size(min = 20, message = "O campo da descrição deve ter no mínimo 20 letras")
	private String synopsis;

	private Long genreId;

	public MoviesDTO() {

	}

	public MoviesDTO(Long id, String title, String subTitle, Integer year, String imgUrl, String synopsis) {

		this.id = id;
		this.title = title;
		this.subTitle = subTitle;
		this.year = year;
		this.imgUrl = imgUrl;
		this.synopsis = synopsis;
	}

	public MoviesDTO(Movie entity) {

		this.id = entity.getId();
		this.title = entity.getTitle();
		this.subTitle = entity.getSubTitle();
		this.year = entity.getYear();
		this.imgUrl = entity.getImgUrl();
		this.synopsis = entity.getSynopsis();
		this.genreId = entity.getGenre().getId();
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

	public Long getGenreId() {
		return genreId;
	}

	public void setGenreId(Long genreId) {
		this.genreId = genreId;
	}

}
