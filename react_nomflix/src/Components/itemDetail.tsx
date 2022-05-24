
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import styled from "styled-components";
import { getDetailData, IDatas } from "../api";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 350px;
`;

const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 20px;
	font-size: 46px;
	position: relative;
	top: -135px;
`;

const BigOverview = styled.p`
	padding: 20px;
	position: relative;
	top: -60px;
	color: ${(props) => props.theme.white.lighter};
`;

const BigUl = styled.ul`
  display: flex;
  justify-content: center;
`;

const Bigli = styled.li`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  font-size:15px;
  font-weight:400;
  position:relative;
  top: 30px;

`;

const BigDiv = styled.div`
  background-color: ${(props) => props.theme.white.lighter};
  color:${(props) => props.theme.black.darker};
  font-weight: 400;
  position: relative;
  top: 30px;
  text-align: center;
  font-size:20px;
  height:35px;
  padding-top: 5px;
`;

interface IDetail {
  id: number;
  kind: string;
}

function ItemDetail({id, kind} : IDetail){
  console.log(id);
  const navigate = useNavigate();
  //const bigMovieMatch = useMatch("/movies/:movieId");
  const onOverlayClick = (kind: string) => {
    if(kind === "movie"){
      navigate("/");
    }else{
      navigate(`/${kind}`);
    }
  };
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IDatas>(["detail", id, kind], () =>
    getDetailData(id, kind)
  );
  
  return (
    <AnimatePresence>
      <>
        <Overlay
          onClick={() => onOverlayClick(kind)}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <BigMovie style={{ top: scrollY.get() + 100 }}>
        {data && ( 
          <>
            <BigCover
              style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(data.backdrop_path,"w500")})`,}}
            />
            <BigUl>
              <Bigli>{data.release_date ? "Release" : "First Air"} : {data.release_date || data.first_air_date}</Bigli>
              {data.runtime && <Bigli>Runtime : {data.runtime}</Bigli>}
              <Bigli>Vote : {data.vote_average}</Bigli>
              <Bigli>Popular : {Math.ceil(data.popularity)}</Bigli>
            </BigUl>
            {data.tagline && <BigDiv>{data.tagline}</BigDiv>}
            <BigTitle>{data.title || data.name}</BigTitle>
            <BigOverview>{data.overview}</BigOverview>
          </>
        )}        
        </BigMovie>
      </>
    </AnimatePresence>  
  );
}

export default ItemDetail;