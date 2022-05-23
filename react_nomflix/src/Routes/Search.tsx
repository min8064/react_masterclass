import { useEffect, useState } from "react";

import { useQuery } from "react-query";
import { useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getSearchData, IDatas, IGetDatasResult } from "../api";
import Slider from "../Components/Slider"

const Wrapper = styled.div`
  background-color: black;
  margin-top: 80px;
`;

const SliderWrap = styled.div`
  width: 100%;
  height: 300px;
  margin: 0 25px;
`;

const SliderTit = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  padding: 20px;
`;

function Search() {
  const location = useLocation();
  const parameter = new URLSearchParams(location.search).get("keyword");
  const [keyword, setKeyword] = useState(parameter);
  useEffect(() => {
    if (parameter !== null) setKeyword(parameter);
  }, []);
  const [searchYN, setSearchYN] = useState(true);
  const { data, isLoading } = useQuery<IGetDatasResult>(
    ["search", keyword],
    () => getSearchData(keyword)
  );

  let movieResults: IDatas[] = [];
  let tvResults: IDatas[] = [];

  data?.results.map((item) => {
    if (item.media_type === "movie") {
      movieResults.push(item);
    } else if (item.media_type === "tv") {
      tvResults.push(item);
    }
  });

  return (
    <>
       <Wrapper>
        <SliderWrap>
          <SliderTit>Movie Results</SliderTit>
          <Slider data={movieResults} kind={"movie"} category={""} searchYN />
        </SliderWrap>
        <SliderWrap>
          <SliderTit>Tv Show Results</SliderTit>
          <Slider data={tvResults} kind={"tv"} category={""} searchYN />
        </SliderWrap>
      </Wrapper>
    </>
  );
}
export default Search;