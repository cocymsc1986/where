import { Routes, Route } from "react-router-dom";

import { HomePage, UploadPage } from "./pages";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/upload" element={<UploadPage />}></Route>
      </Routes>
    </div>
  );
};

export { App };
