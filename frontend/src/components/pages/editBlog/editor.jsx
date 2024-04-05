import QuilEditor from '../../reusable/quilEditor';
import updateBlog from '../../../services/updateBlog';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import getSingleBlog from '../../../services/getSingleBlog';
import deleteImages from '../../../services/deleteImage';

const initialContent = null;
const IMAGE_SRC_REGEX = new RegExp(/<img[^>]*src="([^"]+)"[^>]*>/g);

const EditBlogEditor = () => {
  const [blog, setBlog] = useState(initialContent);
  const [beforeEditAllImages, setBeforeEditAllImages] = useState([]);
  const params = useParams();
  const quilRef = useRef(null);

  const fetchBlog = async () => {
    const blogId = params.blogId;
    // console.log(('blogId: ', blogId));
    if (!blogId) {
      return;
    }
    const blogData = await getSingleBlog(blogId);
    setBlog({
      blogId: blogData.blog.blogId,
      title: blogData.blog.title,
      content: blogData.blog.content,
      featuredImage: blogData.blog.featuredImage,
      tag: blogData.blog.tag,
    });
    // console.log('blogData: ', blogData);
  };

  const getImagesDataBeforeEdit = () => {
    const beforeEditImages = [];
    const editor = quilRef.current.getEditor();
    const htmlContent = editor.root.innerHTML;
    const imageElements = htmlContent.toString().matchAll(IMAGE_SRC_REGEX);
    for (const image of imageElements) {
      beforeEditImages.push(image[1]);
    }
    // console.log('beforeEditImages: ', beforeEditImages);
    setBeforeEditAllImages(beforeEditImages);
  };

  const deleteRemovedImagesDuringEdit = () => {
    const contentImages = [];
    const editor = quilRef.current.getEditor();
    const htmlContent = editor.root.innerHTML;
    const imageElements = htmlContent.toString().matchAll(IMAGE_SRC_REGEX);
    for (const image of imageElements) {
      contentImages.push(image[1]);
    }
    // filter logic
    const imagesToDelete = beforeEditAllImages.map(
      (image) => !contentImages.includes(image)
    );
    // console.log('imagesToDelete: ', imagesToDelete);
    deleteImages(imagesToDelete);
  };

  useEffect(() => {
    if (blog === initialContent) {
      fetchBlog();
    }
    if (blog !== initialContent) {
      getImagesDataBeforeEdit();
    }
  }, [blog]);
  return (
    <>
      {blog === null ? (
        <p>Loading...</p>
      ) : (
        <QuilEditor
          quilRef={quilRef}
          blogHandler={updateBlog}
          initialContent={blog}
          mainHeading={'Edit blog'}
          submitText={'update'}
          resetText={'reset changes'}
          deleteRemovedImagesDuringEdit={deleteRemovedImagesDuringEdit}
        />
      )}
    </>
  );
};

export default EditBlogEditor;
