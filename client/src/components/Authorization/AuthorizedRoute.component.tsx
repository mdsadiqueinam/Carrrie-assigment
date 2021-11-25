import { useAuth } from "context/Auth.context";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface AuthorizedRouteProps {
  element: ReactElement;
  navigateTo: string;
  isAuthorized?: boolean | undefined;
};

export default function AuthorizedRoute({ element, navigateTo, isAuthorized }: AuthorizedRouteProps) {
  const { user } = useAuth();
  if (isAuthorized === undefined || isAuthorized === null) isAuthorized = true
  if ((user !== null) === isAuthorized ) return element;
  return (
    <Navigate to={navigateTo} />
  )
  
}
