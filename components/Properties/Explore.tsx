"use client";

interface ExploreItem {
  title: string;
  image: string;
  count: string;
}

interface ExploreProps {
  exploreData: ExploreItem[];
}

export const Explore = ({ exploreData }: ExploreProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-stone-900 serif-font mb-6">Explore More</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exploreData.map((item, index) => (
          <div key={index} className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm opacity-90">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};