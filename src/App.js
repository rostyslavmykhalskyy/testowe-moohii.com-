import Router from "./routes";

import SearchField from "./components/SearchField";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  let loading = useSelector((state) => state.appLoading);
  useEffect(() => {
    loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [loading]);
  return (
    <div className="App">
      <header className="header">
        <div className="header__search">
          <SearchField />
        </div>
      </header>
      <main>
        <Router />
      </main>
      {loading && (
        <div className="loading">
          <div className="lds-dual-ring"></div>
        </div>
      )}
    </div>
  );
}

export default App;
