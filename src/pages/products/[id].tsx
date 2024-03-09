import { useRouter } from "next/router";
import Head from "next/head";

export default function Product() {
  const router = useRouter();
  return (
    <>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
            <title>Product {router.query.id}</title>
        </Head>
      <h1>{router.query.id}</h1>
    </>
  );
}
