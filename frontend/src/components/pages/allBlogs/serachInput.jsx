import { useState } from 'react';
import CustomInput from '../../reusable/customInput';

const SearchInput = ({ handleChangeSearchValue }) => {
  const [value, setValue] = useState('');
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeSearchValue(value);
  };
  return (
    <section className="w-full h-[60vh] pt-8 bg-softRed flex flex-col space-y-4 justify-center items-center">
      <h3 className="text-3xl md:text-5xl">All blogs</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-2"
      >
        <CustomInput
          type="text"
          value={value}
          handleValueChange={handleValueChange}
          placeholder="Search"
          required={false}
        />
        <input
          type="submit"
          value="search"
          className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95 cursor-pointer"
        />
      </form>
    </section>
  );
};

export default SearchInput;
