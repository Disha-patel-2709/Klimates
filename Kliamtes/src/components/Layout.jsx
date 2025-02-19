import PropTypes from "prop-types";
import Header from "./Header";

const Layout = ({children}) => {
  return (
    <div className=" bg-gradient-to-br from-background to-muted">
    <Header/>
      <main className="min-h-screen container max-w-[1400px] mx-auto px-4 py-8">
      {children }
      </main>
 <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
  <div className="container max-w-[1400px] mx-auto px-4 text-center text-gray-400">Made with ❤️ by Kliamtes</div>
 </footer>
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout