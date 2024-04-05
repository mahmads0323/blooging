import QuilEditor from '../../reusable/quilEditor';
import postBlog from '../../../services/postBlog';
import { useRef } from 'react';

const initialContent = {
  title: '',
  content: '',
  featuredImage: '',
  tag: '',
};

const AddBlogEditor = () => {
  const quilRef = useRef(null);
  return (
    <QuilEditor
      blogHandler={postBlog}
      initialContent={initialContent}
      mainHeading={'Add a new blog'}
      submitText={'create'}
      resetText={'reset'}
      quilRef={quilRef}
      deleteRemovedImagesDuringEdit={null}
    />
  );
};

export default AddBlogEditor;
