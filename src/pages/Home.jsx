import {
  ArrowRight,
  Package,
  TrendingUp,
  Star,
  Tag,
  Monitor,
  Shirt,
  ShoppingCart,
  DollarSign,
  Boxes,
  User,
  Gem,
} from "lucide-react";
import { useContext } from "react";
import { MyShop } from "../context/MyContext";
import { NavLink } from "react-router";
import { Slide, toast } from "react-toastify";
import Footer from "../components/Footer";

const Home = () => {
  const hour = new Date().getHours();
  const { loggedInUser, products, cartItems, setCartItems } =
    useContext(MyShop);

  const greeting =
    hour < 12 ? "GOOD MORNING" : hour < 17 ? "GOOD AFTERNOON" : "GOOD EVENING";

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const topRated = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  const stats = [
    {
      id: 1,
      icon: <Package size={22} />,
      value: cartItems.length,
      title: "Cart Items",
      subtitle: "In your bag",
      bg: "bg-lime-950",
      iconColor: "text-lime-400",
    },
    {
      id: 2,
      icon: <TrendingUp size={22} />,
      value: `$${subtotal.toFixed(2)}`,
      title: "Cart Value",
      subtitle: "Ready to checkout",
      bg: "bg-blue-950",
      iconColor: "text-blue-400",
    },
    {
      id: 3,
      icon: <Star size={22} />,
      value: topRated.length,
      title: "Top Products",
      subtitle: "Highly Rated",
      bg: "bg-yellow-950",
      iconColor: "text-yellow-400",
    },
    {
      id: 4,
      icon: <Tag size={22} />,
      value: new Set(products.map((p) => p.category)).size,
      title: "Categories",
      subtitle: "To Explore",
      bg: "bg-purple-950",
      iconColor: "text-purple-400",
    },
  ];

  const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  const categories = [
    {
      name: "Electronics",
      icon: Monitor,
      count: products.filter((p) => p.category === "electronics").length,
    },
    {
      name: "Jewelery",
      icon: Gem,
      count: products.filter((p) => p.category === "jewelery").length,
    },
    {
      name: "Men",
      icon: Shirt,
      count: products.filter((p) => p.category === "men's clothing").length,
    },
    {
      name: "Women",
      icon: User,
      count: products.filter((p) => p.category === "women's clothing").length,
    },
  ];

  const addToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    toast.success("Added to cart", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  return (
    <>
      <main className="min-h-screen bg-[#0f0f0f]">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 text-amber-50">
          {/* Hero */}
          <div className="mx-auto max-w-6xl">
            <div
              className="rounded-[25px] border border-white bg-[#151515] p-6 sm:p-10"
              style={{
                backgroundImage: `
          linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
          `,
                backgroundSize: "50px 50px",
              }}
            >
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                {/* Left */}

                <div className="max-w-2xl">
                  <p className="mb-4 text-sm font-semibold tracking-[3px] text-lime-400">
                    {greeting} 👋
                  </p>

                  <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                    Welcome back,
                  </h1>

                  <h1 className="mb-5 text-4xl sm:text-5xl font-bold text-lime-400">
                    {loggedInUser.name}
                  </h1>

                  <p className="mb-6 max-w-lg text-base leading-7 text-gray-400">
                    Discover today's picks — hand-curated products across
                    electronics, fashion, and more.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <NavLink
                      to="/products"
                      className="flex items-center justify-center gap-3 rounded-full bg-lime-400 px-6 py-3 font-semibold text-black transition hover:scale-105"
                    >
                      Shop Now
                      <ArrowRight size={20} />
                    </NavLink>

                    <NavLink
                      to="/products"
                      className="rounded-full border border-gray-700 px-8 py-4 text-base transition hover:border-white"
                    >
                      View All Products
                    </NavLink>
                  </div>
                </div>

                {/* Right */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex h-28 w-full flex-col items-center justify-center rounded-3xl bg-lime-950 border border-lime-700 px-6 py-4">
                    <h2 className="text-4xl font-bold text-lime-400">
                      {products.length}
                    </h2>

                    <p className="mt-1 text-sm text-gray-300 text-center">
                      Products Available
                    </p>
                  </div>

                  <div className="flex h-28 w-full flex-col items-center justify-center rounded-3xl border border-white px-6 py-4">
                    <h2 className="text-4xl font-bold">Free</h2>

                    <p className="mt-1 text-sm text-gray-400 text-center">
                      Delivery on ₹999+
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 rounded-3xl border border-gray-700 bg-[#151515] p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-400"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg}`}
                  >
                    <div className={item.iconColor}>{item.icon}</div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">{item.value}</h2>

                    <p className="text-lg">{item.title}</p>

                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}

            <section className="mt-10">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-syne text-3xl">Shop by Category</h2>

                <NavLink to="/products" className="font-dm-bold text-[#C8F400]">
                  View All →
                </NavLink>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <NavLink
                      to="/products"
                      key={category.name}
                      className="rounded-2xl border border-white p-6 text-center transition hover:-translate-y-1"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C8F400]/20 text-[#88aa00]">
                        <Icon size={24} />
                      </div>

                      <h3 className="mt-4 font-dm-bold text-white">
                        {category.name}
                      </h3>

                      <p className="font-dm-regular text-sm text-zinc-500">
                        {category.count} items
                      </p>
                    </NavLink>
                  );
                })}
              </div>
            </section>
            {/* Product Lists */}

            <section className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* Top Rated */}

              <div className="rounded-3xl border border-white/10 bg-[#1B211A] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-syne text-2xl text-white">
                    <Star size={18} fill="#C8F400" color="#C8F400" />
                    Top Rated
                  </h2>

                  <NavLink
                    to="/products"
                    className="font-dm-bold text-sm text-[#88aa00]"
                  >
                    See all →
                  </NavLink>
                </div>

                <div className="space-y-3">
                  {topRated.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-start gap-4 rounded-2xl bg-[#262222] border border-zinc-200 p-3 transition hover:border-[#C8F400] cursor-pointer sm:flex-row sm:items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-dm-bold text-white">
                          {product.title}
                        </h3>

                        <p className="mt-1 font-dm-medium text-sm text-[#88aa00]">
                          ${product.price}
                        </p>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#C8F400]/30 bg-[#C8F400]/10 text-[#88aa00] transition hover:bg-[#C8F400] hover:text-black"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Arrivals */}

              <div className="rounded-3xl border border-white/10 bg-[#1B211A] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-syne text-2xl text-white">
                    <Boxes size={18} color="#C8F400" />
                    New Arrivals
                  </h2>

                  <NavLink
                    to="/products"
                    className="font-dm-bold text-sm text-[#88aa00]"
                  >
                    See all →
                  </NavLink>
                </div>

                <div className="space-y-3">
                  {newArrivals.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-start gap-4 rounded-2xl bg-[#262222] border border-zinc-200 p-3 transition hover:border-[#C8F400] cursor-pointer sm:flex-row sm:items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-dm-bold text-white">
                          {product.title}
                        </h3>

                        <p className="mt-1 font-dm-medium text-sm text-[#88aa00]">
                          ${product.price}
                        </p>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#C8F400]/30 bg-[#C8F400]/10 text-[#88aa00] transition hover:bg-[#C8F400] hover:text-black"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features */}

            <section className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  title: "Fast Delivery",
                  desc: "Same-day on select items",
                  icon: ArrowRight,
                },
                {
                  title: "Secure Payments",
                  desc: "100% encrypted checkout",
                  icon: DollarSign,
                },
                {
                  title: "Best Prices",
                  desc: "Price-match guarantee",
                  icon: Tag,
                },
              ].map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white bg-[#111111] p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-[#C8F400]/10 p-3 text-[#C8F400]">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h3 className="font-dm-bold">{feature.title}</h3>

                        <p className="font-dm-regular text-sm text-zinc-500">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
