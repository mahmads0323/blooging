import AllTags from '../../reusable/allTags';

const Tags = (props) => {
  return (
    <section className="flex flex-col p-4">
      <p className="font-semibold">choose your topic:</p>
      <div className="flex flex-wrap">
        {AllTags.map((tag, index) => {
          return (
            <div
              key={index}
              onClick={() => props.handleSelectTag(tag)}
              className={`${
                props.selectedTag == tag ? 'bg-softRed' : 'bg-white'
              }  text-sm py-1 px-2 rounded-full my-2 mr-2 cursor-pointer border border-black hover:scale-105`}
            >
              <span>{tag}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Tags;
