import { AuthProvider } from "./context/Auth.context";
import AuthorizedRoute from "components/Authorization/AuthorizedRoute.component";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CustomTheme from "config/Theme";
import { Container } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

import NotFound from "components/404NotFound/NotFound.component";
import Login from "components/Authentication/Login.component";
import Register from "components/Authentication/Register.component";
import Home from "pages/Home.page";

import "style/custom.scss";
import 'style/MUICSSOverride.scss';

function App() {
  return (
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <CustomTheme>
          <Container>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthorizedRoute
                      element={<Home />}
                      navigateTo={"/login"}
                      isAuthorized={true}
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <AuthorizedRoute
                      element={<Login />}
                      navigateTo={"/"}
                      isAuthorized={false}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthorizedRoute
                      element={<Register />}
                      navigateTo={"/"}
                      isAuthorized={false}
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </Container>
        </CustomTheme>
      </StyledEngineProvider>
    </AuthProvider>
  );
}

export default App;
