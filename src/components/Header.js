import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

const Header = () => {
  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* LOGO */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
        <SearchIcon className="h-12 p-4"/>
        </div>

        {/* Right */}
        <div className="flex items-center text-xs space-x-6 mx-6 whitespace-nowrap text-white">
            <div className="link">
                <p>Hello DaB</p>
                <p className="header-links">Account & Lists</p>
            </div>

            <div className="link">
                <p>Returns</p>
                <p className="header-links">& Orders</p>
            </div>

            <div className="relative link flex items-center">
                <span className="absolute right-0 top-0 md:right-6 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">0</span>
                <ShoppingCartIcon className="h-10"/>
                <p className="hidden md:inline header-links text-center mt-2">Cart</p>
            </div>

        </div>

      </div>

      {/* Bot Nav */}
      <div></div>
    </header>
  );
};

export default Header;
