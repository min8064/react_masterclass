import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import {IDatas } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import ItemDetail from "./itemDetail";

const MovingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
	width:10%;
`;

const Row = styled(motion.div)`
	display: grid;
	gap: 10px;
	grid-template-columns: 50px 1fr 1fr 1fr 1fr 1fr 1fr 50px;
	position: absolute;
	width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	height: 150px;
	font-size: 66px;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;
	h4 {
		text-align: center;
		font-size: 18px;
	}
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 5,
	},
};

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -20,
		transition: {
			delay: 0.5,
			duration: 0.1,
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

interface ISlider {
	data?: IDatas[];
	kind: string;
	category: string;
	searchYN?: boolean;
};

interface IMatch {
	kind: string;
  category: string;
  movieId: string;
  tvId: string;
}

const offset = 6;

function Slider({data, kind, category, searchYN}: ISlider) {
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
     // setIncreasing(true);
      const totalMovies = data.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
     // setIncreasing(false);
      const totalMovies = data.length;
      const maxIndex = Math.floor(totalMovies / offset) + 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
	const toggleLeaving = () => setLeaving((prev) => !prev);
	
	const movieMatch = useMatch(`/movie/:movieId`);
	const tvMatch = useMatch(`/tv/:tvId`);

	const onBoxClicked = (id: number, kind: string) => {
		navigate(`/${kind}/${id}`);
	};	
	return (
		<>
				<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
					<Row
						variants={rowVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						transition={{ type: "tween", duration: 1 }}
						key={index}
					>
						<MovingBtn onClick={decreaseIndex}><FontAwesomeIcon icon={faChevronLeft} /></MovingBtn>
						{data?.slice(1)
							.slice(offset * index, offset * index + offset)
							.map((item) => (
								<Box
									layoutId={kind+"_"+category+"."+item.id}
									key={item.id}
									variants={boxVariants}
									whileHover="hover"
									initial="normal"
									onClick={() => onBoxClicked(item.id, kind)}
									transition={{ type: "tween" }}
									bgPhoto={makeImagePath(item.backdrop_path, "w500")}
								>
									<Info variants={infoVariants}>
										<h4>{item.title || item.name}</h4>
									</Info>
								</Box>
							))}
							<MovingBtn onClick={increaseIndex}><FontAwesomeIcon icon={faChevronRight} /></MovingBtn>
					</Row>
				</AnimatePresence>
				{kind === "movie" ? (
					movieMatch && (
						<ItemDetail id={Number(movieMatch.params.movieId)} kind={kind}/>
					)
				) : (
					tvMatch && (
						<ItemDetail id={Number(tvMatch.params.tvId)} kind={kind}/>
					)
				)}
		</>
	);
}

export default Slider;
