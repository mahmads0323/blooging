import { useEffect, useState } from 'react';
import SearchInput from './serachInput';
import Blogs from './blogs';
import Tags from './tags';
import getBlogsByTag from '../../../services/getBlogsByTag';

const AllBlogsPage = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [message, setMessage] = useState('Loading...');
  const [searchValue, setSearchValue] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const handleChangeSearchValue = (value) => {
    setSearchValue(value);
  };

  const handleSelectTag = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag('');
      return;
    }
    setSelectedTag(tag);
  };

  const fetchBlogsByTag = async () => {
    setMessage('Loading...');
    const responseData = await getBlogsByTag(selectedTag, searchValue);
    if (responseData.blogs) {
      setAllBlogs(responseData.blogs);
      if (responseData.blogs.length !== 0) {
        setMessage('');
      } else {
        setMessage('no matching blogs');
      }
    } else {
      setAllBlogs([]);
      setMessage('');
    }
  };

  useEffect(() => {
    fetchBlogsByTag();
  }, [selectedTag, searchValue]);

  return (
    <>
      <SearchInput handleChangeSearchValue={handleChangeSearchValue} />
      <div className="flex flex-col md:flex-row-reverse md:gap-4">
        <div className="md:flex-[30%]">
          <Tags selectedTag={selectedTag} handleSelectTag={handleSelectTag} />
        </div>
        <div className="md:flex-[70%] h-screen overflow-y-auto ">
          {allBlogs.length > 0 ? <Blogs blogs={allBlogs} /> : <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default AllBlogsPage;
