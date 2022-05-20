import styled from "styled-components";
import {motion} from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  //overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { rotateZ: 90},
  click: { borderRadius: "100px"},
};

//drag 라고만 사방으로 다 드래그할 수 있고 drag="x", drag="y" 축 고정 제약이 생김
// dragElastic 마우스 탄성 0~1사이값 0.5가 기본, dragSnapToOrigin 원래 자리로 돌아감
//useRef 드래그 영역 제한
function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return(
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box drag dragElastic={0.5} dragSnapToOrigin dragConstraints={biggerBoxRef} variants={boxVariants} whileHover="hover" whileTap="click" />
      </BiggerBox>
    </Wrapper>
  );
}

export default App;
