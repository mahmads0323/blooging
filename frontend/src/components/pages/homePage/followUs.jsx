import Facebook from '/facebook.png';
import Twitter from '/square-x-twitter.png';
import Github from '/github.png';

const FollowUs = () => {
  return (
    <section className="flex items-center justify-center space-x-2 py-3 md:py-5">
      <p className="text-sm">Follow us</p>
      <div className="flex space-x-1">
        <a href="#" target="blank">
          <img
            src={Facebook}
            alt="Facebook"
            className="h-4 w-4 md:h-6 md:w-6 hover:scale-105"
          />
        </a>
        <a href="#" target="blank">
          <img
            src={Twitter}
            alt="Twitter"
            className="h-4 w-4 md:h-6 md:w-6 hover:scale-105"
          />
        </a>
        <a href="#" target="blank">
          <img
            src={Github}
            alt="Github"
            className="h-4 w-4 md:h-6 md:w-6 hover:scale-105"
          />
        </a>
      </div>
    </section>
  );
};

export default FollowUs;
