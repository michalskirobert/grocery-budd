import ReactDOM from "react-dom/client";

import { GroceryList } from "./components/groceries";
import { Provider } from "./store/provider";

import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Provider {...{ Children: <GroceryList /> }} />);
