import styled from "styled-components";
import {motion} from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient;
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
};

// transition type: "spring", damping : 반동력 0이면 무기한 진동, stiffness : 경직성, mass : 물체의 질량, 
// bounce : 0~1사이 값이여야함,  0.25가 기본값, 작을수록 덜 튕김
function App() {
  return(
    <Wrapper>
      <Box whileHover={{ scale: 2 }} whileTap={{ borderRadius: "100px" }} />
    </Wrapper>
  );
}

export default App;