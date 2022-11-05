import ReactDOM from "react-dom/client";

import { Provider } from "./store/provider";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "./store/utils";
import { Suspense } from "react";

import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider
    {...{
      Children: (
        <BrowserRouter>
          {routers.map(({ path, Children, index }) => {
            return (
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route {...{ path, element: <Children />, index }} />
                </Routes>
              </Suspense>
            );
          })}
        </BrowserRouter>
      ),
    }}
  />
);
