import styled from "styled-components";
import {motion, useMotionValue} from "framer-motion";
import { useEffect, useRef } from "react";

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

//motionvalue가 바뀌어도 재랜더링되지 않는다

function App() {
  const x = useMotionValue(0);
  //그냥 console log는 안찍힘, react 세계에 존재하는 값이 아니기 때문
  useEffect(() => {
    x.onChange(() => console.log(x.get()));
  }, [x]);
  
  //버튼을 이용해 x.set()으로 직접 이동값을 지정할 수도 있음
  return(
    <Wrapper>
        <button onClick={() => x.set(200)}>click me</button>
        <Box style={{ x }} drag="x" dragSnapToOrigin/>
    </Wrapper>
  );
}

export default App;
