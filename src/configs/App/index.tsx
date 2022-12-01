
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RenderRoute from "../../routes";

const App: React.FC = () => {
  return (
      <BrowserRouter basename="">
        <>
          <RenderRoute />
        </>
      </BrowserRouter>
  );
};

export default App;
