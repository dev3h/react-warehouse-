import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "@/components/shared-components/Loading";

const System = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${match.url}`} component={lazy(() => import(`./system-list`))} />
      </Switch>
    </Suspense>
  );
};

export default System;
