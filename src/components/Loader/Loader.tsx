import { CircularProgress, Modal } from "@mui/material";

import "./css/Loader.scss";

const Loader = () => {
  return (
    <>
      <Modal
        keepMounted
        open={true}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        className="loader-wrapper"
      >
        <CircularProgress color="secondary" size={120} />
      </Modal>
    </>
  );
};

export default Loader;
