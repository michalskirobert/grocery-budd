import { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "./store/provider";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "./store/utils";
import { ToastContainer } from "react-toastify";

import { CustomLoader } from "@components/shared";

import "./assets/style/index.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-block-ui/style.css";

import { AuthPage } from "@components/auth-route-component";

import * as S from "./styles";
import { Navigation } from "@components/layout/header";

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
              <Suspense fallback={<CustomLoader />}>
                <Navigation />
                <Routes>
                  {routers.map(({ path, Children, index }) => {
                    return (
                      <Route {...{ path, element: <Children />, index }} />
                    );
                  })}
                </Routes>
              </Suspense>
              <ToastContainer {...{ theme: "colored" }} />
            </AuthPage>
          </S.Container>
        </BrowserRouter>
      ),
    }}
  />
);
