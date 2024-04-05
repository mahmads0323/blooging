import { useState, useMemo, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import AllTags from './allTags';
import 'react-quill/dist/quill.snow.css';

import imageHandler from './imageHandler';
import PostImage from '../../services/postImage';
import deleteHandler from './deleteHandler';

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }], // Create headers (all levels)
  ['bold', 'italic', 'underline', 'strike'], // Basic styles
  [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and unordered lists
  ['link', 'image'], // Insert links, images, and videos
  ['code-block'], // Code block formatting
  ['formula'], // Formula editor (requires additional plugin)
  ['clean'], // Remove all formatting
];

const QuilEditor = ({
  quilRef,
  blogHandler,
  initialContent,
  mainHeading,
  resetText,
  submitText,
  deleteRemovedImagesDuringEdit,
}) => {
  const [blog, setBlog] = useState(initialContent);
  const [faturedImageUpdated, setFaturedImageUpdated] = useState(false);
  const featuedImageRef = useRef(null);

  const chnageBlogTitle = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };
  const changleBlogContent = (data) => {
    setBlog({ ...blog, content: data });
  };
  const changeFeaturedImage = (e) => {
    setFaturedImageUpdated(true);
  };
  const changeBlogTag = (e) => {
    setBlog({ ...blog, tag: e.target.value });
  };
  const postFeaturedImage = async () => {
    console.log('featured image: ', featuedImageRef.current.files.length);
    const formData = new FormData();
    formData.append('image', featuedImageRef.current.files[0]);
    const responseData = await PostImage(formData);
    return responseData.image;
  };
  const handleReset = () => {
    setBlog(initialContent);
    return;
  };

  const cachedModules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: { image: () => imageHandler(quilRef) },
      },
    };
  }, []);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    deleteHandler(quilRef); // not using await here
    let uploadedImage = initialContent.featuredImage;
    if (faturedImageUpdated) {
      uploadedImage = await postFeaturedImage();
    }

    const responseData = await blogHandler({
      ...blog,
      featuredImage: uploadedImage,
    });
    console.log('responseData: ', responseData);
    setBlog(initialContent);
    if (deleteRemovedImagesDuringEdit !== null) {
      deleteRemovedImagesDuringEdit();
    }
    window.location.replace(`/blog/${responseData.blogId}`);
    return;
  };

  return (
    <section className="pt-20 pb-10 flex flex-col items-center">
      <p className="text-center font-semibold text-xl text-softRed">
        {mainHeading}
      </p>

      <form
        action="#"
        className="flex flex-col items-center space-y-2 h-[80vh] w-[90vw] md:w-[80vw] lg:w-[70vw] py-5"
        onSubmit={handleBlogSubmit}
      >
        <label className="w-full">
          <p className="text-base font-semibold">Blog Title</p>
          <input
            type="text"
            value={blog.title}
            onChange={chnageBlogTitle}
            placeholder="Enter title"
            required
            className="text-textColor py-1 px-2 w-full border border-solid border-black rounded-lg focus:border-2 focus:outline-none"
          />
        </label>
        <label
          htmlFor="faturedImage"
          className="flex items-center space-x-2 w-full"
        >
          <p className="text-softRed font-bold text-nowrap">Featured Image</p>
          <input
            ref={featuedImageRef}
            id="faturedImage"
            type="file"
            accept="image/*"
            onChange={changeFeaturedImage}
            // value={blog.featuredImage}
          />
        </label>
        <div className=" w-full h-full overflow-y-auto shadow-md">
          <ReactQuill
            ref={quilRef}
            theme="snow"
            value={blog.content}
            onChange={changleBlogContent}
            className="h-full overflow-y-auto"
            placeholder="start typings"
            modules={cachedModules}
          />
        </div>
        <div className="my-2 flex justify-between  w-full py-2">
          <div className="flex space-x-2 items-center">
            <p className="text-softRed font-bold">Tags</p>
            <select
              onChange={changeBlogTag}
              defaultValue={blog.tag || 'empty'}
              className="border border-black rounded-lg cursor-pointer p-1 w-full overflow-x-hidden"
            >
              <option value="empty" disabled name="default">
                choose tag
              </option>
              {AllTags.map((tag, index) => (
                <option value={tag} key={index}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2 w-full justify-end">
            <input
              type="submit"
              value={submitText}
              className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95 cursor-pointer"
            />
            <input
              type="button"
              value={resetText}
              onClick={handleReset}
              className="bg-black px-2 py-1 text-softRed shadow-lg rounded-lg active:scale-95 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default QuilEditor;
