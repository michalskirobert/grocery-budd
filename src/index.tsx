import { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "./store/provider";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "./store/utils";
import * as S from "./styles";

import { CustomLoader } from "@components/shared";

import "./assets/style/index.scss";
import "bootstrap/dist/css/bootstrap.css";
import { AuthPage } from "@components/auth-route-component";

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
            </AuthPage>
          </S.Container>
        </BrowserRouter>
      ),
    }}
  />
);
