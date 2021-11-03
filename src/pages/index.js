import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DaB Music BlockChain</title>
      </Head>

      <h1>Hey DABBB</h1>
      {/* Header */}
      <Header />
    </div>
  );
}
