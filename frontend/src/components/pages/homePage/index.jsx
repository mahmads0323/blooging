import NewsLetter from './newsLetter';
import FollowUs from './followUs';
import HeroSection from './hero';
import SuggestedBlogs from './suggestedBlogs';
import TrendingBlogs from './trendingBlogs';
import NewBlogs from './newBlogs';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SuggestedBlogs />
      <TrendingBlogs />
      <NewBlogs />
      <NewsLetter />
      <FollowUs />
    </>
  );
};

export default HomePage;
