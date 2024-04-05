import { useCookies } from 'react-cookie';
import { useContextStore } from '../../context/contextStore';

const HeroSection = () => {
  const { openLoginPortal } = useContextStore();
  const [cookies, setCookies, deleteCookies] = useCookies(['userToken']);
  const handleClick = () => {
    openLoginPortal();
  };
  return (
    <section className="flex flex-col space-y-2 py-20 w-full h-screen items-center justify-center bg-softRed relative overflow-hidden border-b border-black">
      <span className="text-5xl lg:text-8xl text-center">Be curious</span>
      <p className="w-[80%] text-center">
        Unleash Your Creativity: Explore Insights, Stories, and Inspiration!
      </p>
      {!cookies.userToken && (
        <button
          onClick={handleClick}
          className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95 absolute bottom-[20%] animate-slideFromBottomToTop"
        >
          Start now
        </button>
      )}
    </section>
  );
};

export default HeroSection;
