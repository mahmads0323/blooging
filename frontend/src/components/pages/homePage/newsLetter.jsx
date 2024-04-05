import { useState } from 'react';
import CustomInput from '../../reusable/customInput';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [submitBtnValue, setSubmitBtnValue] = useState('subscribe');
  const handleValueChange = (e) => {
    setEmail(e.target.value);
  };
  const handeSubmit = (e) => {
    e.preventDefault();
    console.log('NewsLetter email: ', email);
    setEmail('');
    setSubmitBtnValue('subscribed');
  };
  return (
    <section className="flex flex-col space-y-2 w-full justify-center items-center py-5 md:mt-5 md:py-10 bg-softRed border-b border-solid border-black">
      <p className="text-xl md:text-2xl">
        Subscribe to{' '}
        <span className="underline font-semibold">Newsletter!</span>
      </p>
      <form
        action="#"
        className="flex flex-col items-center space-y-2  md:space-y-3"
        onSubmit={handeSubmit}
      >
        <CustomInput
          inputType="email"
          placeholder="Enter email"
          required={true}
          value={email}
          handleValueChange={handleValueChange}
        />
        <input
          type="submit"
          value={submitBtnValue}
          className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95 cursor-pointer"
        />
      </form>
    </section>
  );
};

export default NewsLetter;
