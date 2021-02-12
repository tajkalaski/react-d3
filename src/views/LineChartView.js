import React, { useState } from "react";
import LayoutTemplate from "../templates/LayoutTemplate";
import LineChart from "../components/organisms/LineChart";
import ChartData from "../components/organisms/ChartData";
import Modal from "./../components/organisms/Modal";
import { motion } from "framer-motion";

const variants = () => ({
  start: {
    scale: 0,
    opacity: 0,
    transition: {
      duriation: 0.2,
      type: "spring",
      ease: "easeInOut",
    },
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      duriation: 0.2,
      type: "spring",
      ease: "easeInOut",
    },
  },
});

const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  zIndex: 100000,
};

const LineChartView = () => {
  const array = [
    [12, 20, 21, 28, 36, 26, 47],
    [15, 34, 72, 99, 101, 102],
  ];

  const [data, setData] = useState(array);
  const [colors, setColors] = useState([
    "hsl(206, 64%, 63%)",
    "hsl(24, 100%, 67%)",
  ]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateData = (evt, newData) => {
    evt.preventDefault();
    setData(newData);
  };

  const updateColors = (color, i) => {
    let updatedColors = [...colors];
    updatedColors[i] = color;
    setColors(updatedColors);
  };

  console.log(variants);

  return (
    <>
      <motion.div
        className="motiondiv"
        variants={variants()}
        initial="start"
        animate={show ? "end" : "start"}
        style={modalStyles}
      >
        {show && (
          <Modal show={show}>
            <LineChart
              show={show}
              onHide={handleClose}
              onShow={handleShow}
              data={data}
              colors={colors}
            />
          </Modal>
        )}
      </motion.div>
      {!show && (
        <LayoutTemplate chartType="line">
          <ChartData
            chartType="line"
            onSubmit={updateData}
            data={data}
            color={colors}
            setColor={updateColors}
          />

          <LineChart
            show={show}
            onShow={handleShow}
            data={data}
            colors={colors}
          />
        </LayoutTemplate>
      )}
    </>
  );
};

export default LineChartView;
