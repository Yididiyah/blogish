import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return {
      ...page, styleTags,
    };
  }

     GlobalStyle = createGlobalStyle`
    ${normalize}
  
    // You can continue writing global styles here
    body {
      /* padding: 0; */
      /* background-color: black; */
      /* border: 5px solid black; */
      height: 100%;
      width: 100%;
      
    }
    html {
      height: 100%;
      width: 100%
    }
  `;

     render() {
       return (
         <html lang="en">
           <Head>
             {/* <title>Blogish</title> */}
             <meta name="description" content="An online publishing platform" />
             <meta charSet="utf-8" />
             <meta name="viewport" content="width=device-width, initial-scale=1" />
             <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />

             {this.props.styleTags}
           </Head>
           <body>
             <this.GlobalStyle />
             <Main />
             <NextScript />
           </body>
         </html>
       );
     }
}
export default MyDocument;
