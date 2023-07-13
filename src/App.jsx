// eslint no-unused-vars
import { createContext, useState } from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import GetStartedPage from "./pages/GetStartedPage";
import BooksPage from "./pages/BooksPage";
import Error from "./components/Error/Error";
import { getCookie } from "./utils/util-functions";
import Logout from "./components/micros/Logout";
import DashboardPage from "./pages/DashboardPage";
export const UserContext = createContext(null);


function App() {
  let userData = null;
  try {
    userData = JSON.parse(getCookie('user')) ?? "";
  } catch (error) {
    userData= null
  }

  const [user, setUser] = useState(userData);

  return (
    <BrowserRouter>
    <UserContext.Provider value={{user, setUser}}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route exact path="/" element={<HomePage />} errorElement={<Error />} />
            <Route exact path="get-started" element={<GetStartedPage />} errorElement={<Error />} />
            <Route exact path="dashboard" element={<DashboardPage />} errorElement={<Error />} />
            <Route path="books" element={<BooksPage showIssuedBooks={false} />} errorElement={<Error />} >
              <Route path=":userBookType" element={<BooksPage showIssuedBooks={true} />} errorElement={<Error />} />
            </Route>
            <Route exact path="logout" element={<Logout />} errorElement={<Error />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </div>
        
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
