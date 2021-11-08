import Head from "next/head";

//      COMPONENTS
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({products}) {  // pasando props desestructurados desde fetch
  return (
    <div>
      <Head className="bg-gray-100">
        <title>DaB Music BlockChain</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products} /> {/* Para Mandarlo hacia ProductFeed component como prop */}

      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}

// 'https://fakestoreapi.com/products'
