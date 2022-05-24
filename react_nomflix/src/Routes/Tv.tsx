import { useQuery } from "react-query";
import styled from "styled-components";
import { getAiringTodayTv, getPopularTv, getTopRatedTv, getLatestTv,  IGetDatasResult } from "../api";
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
  position: relative;
  padding: 20px;
`;

const offset = 6;

function Tv() {
  const { data : airingTv, isLoading: airingLoading } = useQuery<IGetDatasResult>(
    ["tv", "airingTv"],
    getAiringTodayTv
  );
  const airingTvs = airingTv?.results;

  const { data : latestTv, isLoading: latestLoading } = useQuery<IGetDatasResult>(
    ["tv", "latestTv"],
    getLatestTv
  );
  const latestTvs = latestTv?.results;

  const { data : topTv, isLoading: topLoading } = useQuery<IGetDatasResult>(
    ["tv", "topTv"],
    getTopRatedTv
  );
  const topTvs = topTv?.results;

  const { data : popularTv, isLoading: popularLoading } = useQuery<IGetDatasResult>(
    ["movies", "upcomingMovie"],
    getPopularTv
  );
  const popularTvs = popularTv?.results;
  
  return (
    <Wrapper>
      {airingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(airingTv?.results[0].backdrop_path || "")}>
            <Title>{airingTv?.results[0].title}</Title>
            <Overview>{airingTv?.results[0].overview}</Overview>
          </Banner>
          <SliderWrap>
			      <SliderTit>Airing</SliderTit>
            <Slider data={airingTvs} kind="tv" category="airing_today" />
          </SliderWrap>
          <SliderWrap>
            <SliderTit>Latest</SliderTit>
            <Slider data={latestTvs} kind="tv" category="latest" />
          </SliderWrap>
          <SliderWrap>
			      <SliderTit>Top Rated</SliderTit>
            <Slider data={topTvs} kind="tv" category="top_rated" />
          </SliderWrap>
          <SliderWrap>
			      <SliderTit>Upcoming</SliderTit>
            <Slider data={popularTvs} kind="tv" category="popular" />
          </SliderWrap>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;