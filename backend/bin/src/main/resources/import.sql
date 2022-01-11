INSERT INTO tb_genre (name)  VALUES ('Ação');
INSERT INTO tb_genre (name)  VALUES ('Aventura');
INSERT INTO tb_genre (name)  VALUES ('Mistério'); 
INSERT INTO tb_genre (name)  VALUES ('Romance');
INSERT INTO tb_genre (name)  VALUES ('Suspense');
INSERT INTO tb_genre (name)  VALUES ('Comédia'); 
INSERT INTO tb_genre (name)  VALUES ('Crime');
INSERT INTO tb_genre (name)  VALUES ('Animação');
INSERT INTO tb_genre (name)  VALUES ('Fantasia'); 
INSERT INTO tb_genre (name)  VALUES ('Terror'); 


INSERT INTO tb_role (authority)  VALUES ('VISITOR');
INSERT INTO tb_role (authority)  VALUES ('MEMBER');
 
INSERT INTO tb_user (name, email, password) VALUES ('Alex Brown', 'alex@gmail.com', '$2a$10$HSfDbwxcMCQs3xVVSDWYwu32/uZ4jgTWVz.hU3W8APxb9Z4FYf0O6');
INSERT INTO tb_user (name, email, password) VALUES ('Bob Brown', 'bob@gmail.com', '$2a$10$SqhHVe6KmO/qCm/irKBmoeDz36xydIFjqft3gkP5z1Lj49zECiIQq');
INSERT INTO tb_user (name, email, password) VALUES ('Maria', 'maria@gmail.com', '$2a$10$2ppHgi1XTTjYSgbQri.SBeV77t2eWdUaqPrrB7hELKfU8381PXzv2');
INSERT INTO tb_user (name, email, password) VALUES ('João Otávio', 'joao@gmail.com', '$2a$10$a0xXM7es.VsZjCGFUz9DOOYlpNYcBwE/nX/Ew8fLXEeWT6pnyqqvm');

INSERT INTO tb_user_role (user_id, role_id)  VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id)  VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id)  VALUES (3, 1);
INSERT INTO tb_user_role (user_id, role_id)  VALUES (4, 2);



INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BNTkwOTE1ZDYtODQ3Yy00YTYwLTg0YWQtYmVkNmFjNGZlYmRiXkEyXkFqcGdeQXVyNTc4MjczMTM@._V1_FMjpg_UX864_.jpg','O vilão Loki reempreende seu papel como o Deus do Mal....', 'O vilão Loki reempreende seu papel como o Deus do Mal em uma nova série que ocorre após os eventos de "Vingadores: Ultimato".', 'Loki', 2021,9);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BMTE2ODU4NDEtNmRjNS00OTk1LTg4NmMtNTAzYzVlNzJmYjgzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_QL75_UX380_CR0,0,380,562_.jpg','Um filme de terror','Após os eventos em casa, a família Abbott agora enfrenta os terrores do mundo exterior. Forçados a se aventurar no desconhecido, eles percebem que as criaturas que caçam não são as únicas ameaças ocultas pelo caminho.','Um Lugar Silencioso: Parte II',2020,10);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BZTQyNTU0MDktYTFkYi00ZjNhLWE2ODctMzBkM2U1ZTk3YTMzXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_QL75_UX380_CR0,0,380,562_.jpg','É assim que uma nova amizade começa','Na Riviera italiana, uma amizade tão forte quanto inesperada surge entre um ser humano e um monstro marinho camuflado.','Luca',2021,8);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BOWI5YTUxOWEtZmRiZS00ZmQxLWE2NzctYTRiODA2NzE1ZjczXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UX380_CR0,0,380,562_.jpg','Conheça as origens de Cruella','Uma prequela sobre a vida da jovem Cruella de Vil.','Cruella',2021,6);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BZGEwYmMwZmMtMTQ3MS00YWNhLWEwMmQtZTU5YTIwZmJjZGQ0XkEyXkFqcGdeQXVyMTI5MzA5MjA1._V1_QL75_UX380_CR0,4,380,562_.jpg','Uma comédia intrigante','Ao viverem sua vida suburbana ideal, Wanda Maximoff e Vision começam a suspeitar que as coisas não são o que parecem.','WandaVision',2021,6);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BODNiODVmYjItM2MyMC00ZWQyLTgyMGYtNzJjMmVmZTY2OTJjXkEyXkFqcGdeQXVyNzk3NDUzNTc@._V1_QL75_UX380_CR0,0,380,562_.jpg','Uma produção conjunta da Disney e Marvel','Uma produção da Disney e da Marvel Studios, estrelando os personagens carismáticos Falcão e Soldado Invernal.','Falcão e o Soldado Invernal',2021,2);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BMjM5YTRlZmUtZGVmYi00ZjE2LWIyNzAtOWVhMDk1MDdkYzhjXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_QL75_UX380_CR0,20,380,562_.jpg','O protagonista está sob a mira de um traficante perigoso','Um garoto intervém para ajudar uma mulher sendo assediada por um grupo de homens, ele se torna o alvo de um traficante vingativo.','Anônimo',2021,1);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_QL75_UX380_CR0,0,380,562_.jpg','Muito horror com monstros com audição sensível','Em um mundo pós-apocalíptico, uma família é forçada a viver em silêncio enquanto se esconde de monstros com audição ultra-sensível.','Um Lugar Silencioso', 2018, 10);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BNGVkOTlhOTktNjZiNS00NDg3LWIxMDAtZTY5Y2E0YjllN2IxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX380_CR0,0,380,562_.jpg','O enredo envolve uma personagem fria e misteriosa','O enredo segue-se a H, uma personagem fria e misteriosa que trabalha numa empresa de camiões de dinheiro responsável pela movimentação de centenas de milhões de dólares em Los Angeles todas as semanas.','Infiltrado',2021,1);
INSERT INTO tb_movie (img_url, sub_title, synopsis, title, year, genre_id)  VALUES ('https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_QL75_UX380_CR0,0,380,562_.jpg', 'Sequência de vingadores guerra infinita','Após os eventos devastadores de Vingadores: Guerra Infinita , o universo está em ruínas, e com a ajuda de aliados os Vingadores se reúnem para desfazer as ações de Thanos e restaurar a ordem.', 'Vingadores: Ultimato', 2019, 2);
 

INSERT INTO tb_review (text, movie_id, user_id) VALUES ('Achei o filme ótimo, meus parabéns para o diretor!!!', 1, 2);
