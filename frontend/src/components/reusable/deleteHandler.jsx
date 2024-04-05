import deleteImages from '../../services/deleteImage';
import { uploadedImages } from './imageHandler';

const IMAGE_SRC_REGEX = new RegExp(/<img[^>]*src="([^"]+)"[^>]*>/g);

const deleteHandler = (quilRef) => {
  let contentImages = [];
  const editor = quilRef.current.getEditor();
  const htmlContent = editor.root.innerHTML;
  const contentRegexImages = htmlContent.toString().matchAll(IMAGE_SRC_REGEX);
  for (const regexImage of contentRegexImages) {
    contentImages.push(regexImage[1]);
  }
  // filter deleted items
  const imagesToDelete = uploadedImages.filter(
    (uploaded) => !contentImages.includes(uploaded)
  );
  //   console.log('imagesToDelete: ', imagesToDelete);
  deleteImages(imagesToDelete);
};

export default deleteHandler;
