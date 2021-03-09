import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { LoginPage } from "./pages/LoginPage";
import AuthProvider from "./services/auth/AuthProvider";
import useAppTheme from "./theme";
import PrivateRoute from "./services/auth/PrivateRoute";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const [theme, toggleThemeType] = useAppTheme();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/app" />
            </Route>
            <PrivateRoute path="/app">
              <MainLayout toggleDark={toggleThemeType} />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/*">
              <NotFoundPage/>
            </Route>
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
