import Head from 'next/head'
import App from "./App/Home";
import axios from 'axios';


axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.withCredentials = true;


const Index = () => {
  return (
    <div className="container">
      <Head>
        <title>MyBalance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App/>
      </main>

      <footer>
        Powered by technikiwi
      </footer>
    </div>
  )
}
export default Index;
