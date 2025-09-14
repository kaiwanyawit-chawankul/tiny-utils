// pages/_app.js
import { Auth0Provider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider>
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
