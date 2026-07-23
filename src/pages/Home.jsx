import { ArrowRight, Package, TrendingUp, Star, Tag } from "lucide-react";
import { useContext } from "react";
import { MyShop } from "../context/MyContext";

const Home = () => {
  const hour = new Date().getHours();
  const { loggedInUser } = useContext(MyShop);

  const greeting =
    hour < 12 ? "GOOD MORNING" : hour < 17 ? "GOOD AFTERNOON" : "GOOD EVENING";

  const stats = [
    {
      id: 1,
      icon: <Package size={28} />,
      value: "0",
      title: "Cart Items",
      subtitle: "In your bag",
      bg: "bg-lime-950",
      iconColor: "text-lime-400",
    },
    {
      id: 2,
      icon: <TrendingUp size={28} />,
      value: "₹0.00",
      title: "Cart Value",
      subtitle: "Ready to checkout",
      bg: "bg-blue-950",
      iconColor: "text-blue-400",
    },
    {
      id: 3,
      icon: <Star size={28} />,
      value: "5",
      title: "Top Products",
      subtitle: "Highly rated",
      bg: "bg-yellow-950",
      iconColor: "text-yellow-400",
    },
    {
      id: 4,
      icon: <Tag size={28} />,
      value: "6",
      title: "Categories",
      subtitle: "To explore",
      bg: "bg-purple-950",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <div className="mx-auto max-w-[1600px] px-8 py-8 text-amber-50">
        {/* Hero */}
        <div
          className="relative mx-auto min-h-[200px] max-w-7xl overflow-hidden rounded-[35px] border border-gray-700 bg-[#151515] p-16"
          style={{
            backgroundImage: `
          linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        >
          <div className="flex justify-between">
            {/* Left */}

            <div className="max-w-2xl">
              <p className="mb-6 text-sm font-semibold tracking-[4px] text-lime-400">
                {greeting} 👋
              </p>

              <h1 className="text-7xl font-bold leading-none">Welcome back,</h1>

              <h1 className="mb-8 text-7xl font-bold text-lime-400">
                {loggedInUser.name}
              </h1>

              <p className="mb-10 max-w-xl text-xl leading-9 text-gray-400">
                Discover today's picks — hand-curated products across
                electronics, fashion, and more.
              </p>

              <div className="flex gap-5">
                <button className="flex items-center gap-3 rounded-full bg-lime-400 px-8 py-4 font-semibold text-black transition hover:scale-105">
                  Shop Now
                  <ArrowRight size={20} />
                </button>

                <button className="rounded-full border border-gray-700 px-8 py-4 text-lg transition hover:border-white">
                  View All Products
                </button>
              </div>
            </div>

            {/* Right */}

            <div className="flex flex-col gap-6">
              <div className="flex h-36 w-48 flex-col items-center justify-center rounded-3xl bg-lime-950 border border-lime-700">
                <h2 className="text-5xl font-bold text-lime-400">20+</h2>

                <p className="mt-2 text-gray-300">Products Available</p>
              </div>

              <div className="flex h-36 w-48 flex-col items-center justify-center rounded-3xl border border-gray-600">
                <h2 className="text-5xl font-bold">Free</h2>

                <p className="mt-2 text-gray-400">Delivery on ₹999+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div className="mt-12 grid grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 rounded-3xl border border-gray-700 bg-[#151515] p-8 transition duration-300 hover:-translate-y-1 hover:border-lime-400"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <div className={item.iconColor}>{item.icon}</div>
              </div>

              <div>
                <h2 className="text-4xl font-bold">{item.value}</h2>

                <p className="text-2xl">{item.title}</p>

                <p className="text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
