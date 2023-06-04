import Home from "./Home";
import { motion } from "framer-motion";

const Pages = () => {
  console.log("Pages called");
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transform={{ duration: 0.5 }}
    >
      <Home />
    </motion.div>
  );
};

export default Pages;
