import { useQuery } from "react-query";
import styled from "styled-components";
import { getLatestMovies, getNowMovies, getTopMovies, getUpcomingMovies,  IDatas,  IGetDatasResult } from "../api";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-top: 70px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const SliderWrap = styled.div`
  width:100%;
  height:300px;
  margin: 0 25px;
`;

const SliderTit = styled.h3`
  font-size:28px;
	color: ${(props) => props.theme.white.lighter};
	margin-bottom: 15px;
`;

const offset = 6;

function Home() {
  const { data : nowPlayingMovie, isLoading: nowPlayingLoading } = useQuery<IGetDatasResult>(
    ["movies", "nowPlaying"],
    getNowMovies
  );
  const nowMovies = nowPlayingMovie?.results;

  let movieResults: IDatas[] = [];
  const { data : latestMovie, isLoading: latestLoading } = useQuery(
    ["movies", "latestMovie"],
    getLatestMovies
  );
  latestMovie?.map((movie:any) => {
      movieResults.push(movie);
  });
  const latestMovies = movieResults;

  const { data : topMovie, isLoading: topLoading } = useQuery<IGetDatasResult>(
    ["movies", "topMovie"],
    getTopMovies
  );
  const topMovies = topMovie?.results;

  const { data : upcomingMovie, isLoading: upcomingLoading } = useQuery<IGetDatasResult>(
    ["movies", "upcomingMovie"],
    getUpcomingMovies
  );
  const upcomingMovies = upcomingMovie?.results;
  
  return (
    <Wrapper>
      {nowPlayingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(nowPlayingMovie?.results[0].backdrop_path || "")}>
            <Title>{nowPlayingMovie?.results[0].title}</Title>
            <Overview>{nowPlayingMovie?.results[0].overview}</Overview>
          </Banner>
          <SliderWrap>
			      <SliderTit>Now Playing</SliderTit>
            <Slider data={nowMovies} kind="movie" category="now_playing" />
          </SliderWrap>
          <SliderWrap>
            <SliderTit>Latest</SliderTit>
            <Slider data={latestMovies} kind="movie" category="latest" />
          </SliderWrap>
          <SliderWrap>
			      <SliderTit>Top Rated</SliderTit>
            <Slider data={topMovies} kind="movie" category="top_rated" />
          </SliderWrap>
          <SliderWrap>
			      <SliderTit>Upcoming</SliderTit>
            <Slider data={upcomingMovies} kind="movie" category="upcoming" />
          </SliderWrap>
        </>
      )}
    </Wrapper>
  );
}

export default Home;