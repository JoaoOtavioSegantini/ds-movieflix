package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import com.devsuperior.movieflix.entities.Review;

public class ResponseMyReviewsDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	

	private Long id;

	private String text;
	
	private String imgUrl;
	
	private String subTitle;
	
	private String title;
	
	private Long movieId;

	
    public ResponseMyReviewsDTO() {
    	
    }
    
	public ResponseMyReviewsDTO(Long id, String text, String imgUrl, String subTitle, String title, Long movieId) {
		super();
		this.id = id;
		this.text = text;
		this.imgUrl = imgUrl;
		this.subTitle = subTitle;
		this.title = title;
		this.movieId = movieId;
	}
	
	public ResponseMyReviewsDTO(Review entity) {
        this.id = entity.getId();
		this.text = entity.getText();
		this.imgUrl = entity.getMovie().getImgUrl();
		this.subTitle = entity.getMovie().getSubTitle();
		this.title = entity.getMovie().getTitle();
		this.movieId = entity.getMovie().getId();
	}
	
	public ResponseMyReviewsDTO(Review entity, MovieDTO dto) {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}
	

}
