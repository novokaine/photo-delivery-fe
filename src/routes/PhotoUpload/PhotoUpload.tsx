import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { ERROR, IDLE, LOADING } from "../../const/Common";
import Loader from "../../components/Loader";
import DialogModal from "../../components/DialogModal";
import { updatePhotoFetchState } from "../../redux/reducers/PhotoReducer";
import PhotoHandler from "./PhotoHandler";

/**
 * Functionalities to be implemented:
 * Prevent file duplication on upload - done
 * Ability to delete a certain file - done
 *  or a certain number of files (Ctrl+Click, Ctrl+Shift+click - lightroom approach)
 */
const PhotoUpload = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { photoFetchState } = useSelector(
    (state: RootState) => state.PhotoReducer
  );

  return (
    <div className="drop-wrapper">
      {photoFetchState === LOADING && <Loader />}
      <DialogModal
        isOpen={photoFetchState === ERROR}
        dialogTitle="Error"
        dialogText="Error uploading pictures"
        handleClose={() => dispatch(updatePhotoFetchState(IDLE))}
      />
      <PhotoHandler />
    </div>
  );
};

export default PhotoUpload;
