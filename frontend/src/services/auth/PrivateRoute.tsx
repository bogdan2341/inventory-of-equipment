import { Reddit } from "@material-ui/icons";
import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export interface PrivateRouteProps {
  children: ReactNode;
  path: string;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Route
      path={props.path}
      render={(routProps) =>
        // !!currentUser ? props.children : <Redirect to="/login" />
        props.children
      }
    />
  );
};

export default PrivateRoute;
