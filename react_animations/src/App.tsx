import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(#e66465, #9198e5);
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 550px;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  height: 50px;
  width: 50px;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled(motion.button)`
  margin-top: -220px;
  color: rgba(230, 126, 34, 1);
  border-radius: 5px;
  height: 35px;
`

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    y: -30,
    transition: { duration: 0.3 }
  },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)", transition: { duration: 0.3 } }
};

const boxVariants = {
  hover: (isHover:number) => ({
    scale: 1.1,
    x: isHover === 0 ? -15 : 15,
    y: isHover === 0 ? -10 : 10
  }),
  tap: {
    color: "rgba(41, 128, 185, 1.0)",
    scale: 1.3,
    transition: { duration: 0.2 }
  }
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper>
      <Grid>
        <Box
          onClick={() => setId("1")}
          key={"1"}
          layoutId={"1"}
          variants={boxVariants}
          whileHover="hover"
          custom={0}
        />
        <Box onClick={() => setId("2")} key={"2"} layoutId={"2"}>
          {!clicked ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box onClick={() => setId("3")} key={"3"} layoutId={"3"}>
          {clicked ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box
          onClick={() => setId("4")}
          key={"4"}
          layoutId={"4"}
          variants={boxVariants}
          whileHover="hover"
          custom={1}
        />
      </Grid>
      <Button onClick={toggleClicked} variants={boxVariants} whileTap="tap">
        Switch
      </Button>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{
                width: 265,
                height: 200,
                backgroundColor: "rgba(255,255,255,1)"
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
