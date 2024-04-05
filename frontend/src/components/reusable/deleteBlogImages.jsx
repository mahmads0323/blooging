import deleteImages from '../../services/deleteImage';

const IMAGE_SRC_REGEX = new RegExp(/<img[^>]*src="([^"]+)"[^>]*>/g);

const deleteBlogImages = async (content, feturedImage) => {
  let contentImages = [feturedImage];
  const contentRegexImages = content.toString().matchAll(IMAGE_SRC_REGEX);
  for (const regexImage of contentRegexImages) {
    contentImages.push(regexImage[1]);
  }
  deleteImages(contentImages);
  // console.log('deleteBlogImages: ', deleteBlogImages.length);
};

export default deleteBlogImages;
