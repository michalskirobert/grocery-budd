import { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "./store/provider";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "./store/utils";
import { ToastContainer } from "react-toastify";

import { CustomLoader } from "@components/shared";

import "./assets/style/index.scss";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthPage } from "@components/auth-route-component";

import * as S from "./styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider
    {...{
      Children: (
        <BrowserRouter>
          <S.Container>
            <AuthPage>
              {routers.map(({ path, Children, index }) => {
                return (
                  <Suspense key={path} fallback={<CustomLoader />}>
                    <Routes>
                      <Route {...{ path, element: <Children />, index }} />
                    </Routes>
                  </Suspense>
                );
              })}
              <ToastContainer {...{ theme: "colored" }} />
            </AuthPage>
          </S.Container>
        </BrowserRouter>
      ),
    }}
  />
);
