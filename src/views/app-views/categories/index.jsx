import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "@/components/shared-components/Loading";

const Category = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${match.url}/system`} component={lazy(() => import(`./system`))} />
        <Redirect from={`${match.url}`} to={`${match.url}/system`} />
      </Switch>
    </Suspense>
  );
};

export default Category;
