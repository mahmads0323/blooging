import PostImage from '../../services/postImage';

export const uploadedImages = [];

const imageHandler = async (quilRef) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  const waitingMessage = 'Uploading...';
  input.click();
  input.onchange = async () => {
    try {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      if (quilRef !== null) {
        const range = await quilRef.current.getEditor().getSelection(true);
        if (range) {
          // adding placeholder message
          await quilRef.current
            .getEditor()
            .insertEmbed(range.index, 'text', waitingMessage);
          // moving one index to right
          await quilRef.current
            .getEditor()
            .setSelection(range.index + waitingMessage.length);
          // uploading image to server
          const responseData = await PostImage(formData);
          uploadedImages.push(responseData.image);
          // deleting placeholder image
          await quilRef.current
            .getEditor()
            .deleteText(range.index, waitingMessage.length);
          // inserting uploaded image
          await quilRef.current
            .getEditor()
            .insertEmbed(range.index, 'image', responseData.image);
          // moving index to right
          await quilRef.current.getEditor().setSelection(range.index + 1);
        } else {
          console.log('range error: ', range);
          return;
        }
      } else {
        console.log('quilRef is null: ', quilRef);
      }
    } catch (e) {
      console.log('image handler error: ', e);
    }
  };
};

export default imageHandler;
