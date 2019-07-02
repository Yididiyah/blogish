import Link from 'next/link';

import Layout from '../components/Layout';

const Index = () => (
  <Layout>
    <h1>Home</h1>
    <Link href="/about">
      <a>Go to About</a>
    </Link>
    <p> Welcome to the home page </p>
  </Layout>
);

export default Index;
