import Config3d from "./Config3d";
import Pricing from "./Pricing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Config3d />,
  },
  {
    path: "/designer-pricing",
    element: <Pricing />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
