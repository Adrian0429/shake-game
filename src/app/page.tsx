"use client"
import Head from "next/head";
import Counter from "./components/Counter";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Shake Counter</title>
        <meta
          name="description"
          content="Shake your phone to increase the count."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Counter />
      </main>
    </div>
  );
}
