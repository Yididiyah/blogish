import Link from 'next/link';
import React from 'react';
const About = () => (
  <div>
    <h1>About</h1>
    <Link href="/">
      <a>Go to home</a>
    </Link>
    <p>An online publishing company</p>
    <img src="/static/blog-logo.jpg" alt="blog-logo" height="200px" />
  </div>
);

export default About;
