import men from "../assets/images/banner-1.jpg";
import women from "../assets/images/banner-2.jpg";
import kids from "../assets/images/banner-3.jpg";

const categories = [
  {
    id: 1,
    title: "Men's",
    image: men,
  },
  {
    id: 2,
    title: "Women's",
    image: women,
  },
  // {
  //   id: 3,
  //   title: "Kid's",
  //   image: kids,
  // },
];

const Categories = () => {
  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

          {categories.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[200px] object-cover duration-500 group-hover:scale-110"
              />

              {/* White Box */}
              <div className="absolute inset-0 flex items-center justify-center">

                <div className="bg-white px-10 py-3">

                  <h3 className="text-2xl font-bold uppercase">
                    {item.title}
                  </h3>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;