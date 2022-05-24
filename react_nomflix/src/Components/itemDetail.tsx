
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
	height: 400px;
`;

const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 20px;
	font-size: 46px;
	position: relative;
	top: -80px;
`;

const BigOverview = styled.p`
	padding: 20px;
	position: relative;
	top: -80px;
	color: ${(props) => props.theme.white.lighter};
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
        <BigMovie
          style={{ top: scrollY.get() + 100 }}
         
        >
        {data && ( 
          <>
            <BigCover
              style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(data.backdrop_path,"w500")})`,}}
            />
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