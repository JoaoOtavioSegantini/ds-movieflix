import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Movie } from "../components/MovieCard";
import movieImg from "../assets/movie-sample.svg";
import { text, theme } from "../styles";
import { Reviews } from "../components";

const movie: Movie = {
  id: 11,
  title: "007 - O Amanhã Nunca Morre",
  subTitle: "Uma nova aventura de James Bond",
  year: 1997,
  imgUrl: movieImg,
  synopsis:
    'James Bond descobre que o magnata da mídia Elliot Carver colocou em prática um plano para manipular as superpotências e expandir seus negócios. O agente deve impedir que essa ideia doentia provoque uma nova guerra mundial.Na sequência pré-créditos, M envia 007 para um bazar de armas na fronteira russa. Dentre as figuras identificadas pelas imagens de satélite e TV está o terrorista americano Henry Gupta, que compra um decodificador de GPS.A marinha britânica lança um míssil para o local, mas Bond percebe duas ogivas nucleares soviéticas num jato Aero L-39 Albatros. Como o míssil britânico não pode ser impedido, Bond sequestra o jato e pilota-o para longe após lutar com o co-piloto para impedir que as bombas explodam causando um desastre radioativo. Muitas das armas e terroristas são destruídos pelo míssil, mas Gupta foge.Elliot Carver, magnata da mídia líder do Carver Media Group Network (CMGN), quer usar o decodificador adquirido por Gupta para provocar uma guerra entre a China e o Reino Unido. Como o atual governo chinês não quer deixar a CMGN ter direitos exclusivos de exibição no país, Carver que substituí-los por políticos mais favoráveis. Com o decodificador, uma fragata inglesa é desviada até o Mar da China Meridional. Lá, um barco stealth liderado por Stamper, capanga de Carver, afunda o navio com uma broca e destrói um Mig chinês que fora investigar. Pensando ter sido um ataque chinês, o Almirante Roebuck dá a M 48 horas para investigar.Como a Carver Media deu notícias do ocorrido bem rápido e o MI6 percebeu um sinal suspeito em um satélite da CMGN durante o ataque, M manda Bond investigar Carver. Em uma festa da CMGN em Hamburgo, Bond seduz e faz amor com Paris, uma ex-namorada sua e atual esposa de Carver, e com a ajuda de informações dela recupera o decodificador na sede do jornal de Carver. Quando Carver descobre, manda matar os dois, e Paris é morta pelo assassino profissional Kaufman, mas Bond escapa. Bond pula no mar da China para investigar os destroços, e descobre que alguns mísseis estão faltando. Após emergir, Bond e a agente chinesa Wai Lin, também enviada para o local por seu governo, são capturados pelos homens de Carver e mandados para a sede da CMGN no Vietnã. Os dois escapam, e decidem resolver o caso juntos.Após informarem a marinha britânica e a força aérea chinesa dos planos de Carver, Bond e Wai Lin descobrem o barco stealth, e o invadem para impedí-lo de bombardear Beijing com um míssil britânico. Bond explode parte do casco do barco e o expõe aos radares, mas Wai Lin é capturada. Bond pega Gupta como refém, mas Carver mata Gupta dizendo que "sua utilidade acabou". Segue-se uma batalha entre Bond e a tripulação, na qual Carver é morto por sua própria broca. Enquanto Bond tenta explodir o míssil, Stamper revela estar com Wai Lin. Bond e Stamper lutam enquanto o segundo tenta afogar Wai Lin. Bond prende o rival no lançador de mísseis e vai salvar a chinesa enquanto a marinha britânica destrói o barco. Os dois agentes sobrevivem em meio aos destroços e fazem amor.',
  genreId: 1,
  reviews: [
    {
      id: 1,
      text: "Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.",
      user: {
        id: 1,
        name: "Maria Silva",
        email: "maria@gmail.com",
        roles: [{ id: 1, authority: "MEMBER" }],
      },
    },
    {
      id: 2,
      text: "Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.",
      user: {
        id: 1,
        name: "Maria Silva",
        email: "maria@gmail.com",
        roles: [{ id: 1, authority: "MEMBER" }],
      },
    },
    {
      id: 3,
      text: "Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.",
      user: {
        id: 1,
        name: "Maria Silva",
        email: "maria@gmail.com",
        roles: [{ id: 1, authority: "MEMBER" }],
      },
    },
  ],
};

interface MovieDetails {
  route: {
    params: number;
  };
}

const MovieDetails: React.FC<MovieDetails> = ({ route: { params: id } }) => {
  console.warn(id);
  return (
    <ScrollView style={theme.detailsView}>
      <View style={theme.movieCard}>
        <Text style={text.detailsTitle}>{movie.title}</Text>
        <Image source={movieImg} style={{ width: "100%", height: 228 }} />
        <Text style={text.detailsYear}>{movie.year}</Text>
        <Text style={text.detailsSubtitle}>{movie.subTitle}</Text>
        <Text style={text.sinopse}>Sinopse</Text>
        <TouchableOpacity activeOpacity={0.8} style={theme.buttonForDetails}>
          <Text style={text.forDetailsMovie}>{movie.synopsis}</Text>
        </TouchableOpacity>
      </View>
      <View style={theme.movieCard}>
        <TextInput
          multiline
          placeholder="Deixe sua avaliação aqui"
          style={theme.inputContainer}
        ></TextInput>
          <TouchableOpacity
          activeOpacity={0.8}
          style={theme.buttonSave}
          onPress={() =>
            console.log("id")
          }
        >
          <Text style={text.saveText}>SALVAR AVALIAÇÃO</Text>
        </TouchableOpacity>
      </View>
      <View style={theme.movieCard}>
        <Text style={text.avaliations}>Avaliações</Text>
        {movie.reviews.map((review) => (
          <Reviews key={review.id} review={review} />
        ))}
      </View>
    </ScrollView>
  );
};

export default MovieDetails;
