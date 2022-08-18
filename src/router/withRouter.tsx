import {
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import React from "react";

function withRouter(Component: any/*React.ComponentType<RouteComponentProps & Object>*/) {
  function ComponentWithRouterProp(propsUse: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    // const context= useContext(arrProductsContext);
    const myprops ={
        location,
        navigate,
        params,
        // context
    }
    return <Component {...propsUse} {...myprops}/>;
}
  return ComponentWithRouterProp;
}

export default withRouter;
export interface RouteComponentProps  {
  location: Location,
  navigate: NavigateFunction,
  params: Readonly<Params<string>>
}