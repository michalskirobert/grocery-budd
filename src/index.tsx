import ReactDOM from "react-dom/client";

import { GroceryList } from "./components/groceries";
import { Provider } from "./store/provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Provider {...{ Children: <GroceryList /> }} />);
