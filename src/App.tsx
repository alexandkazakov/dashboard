import "./scss/main.scss";

import { FC } from "react";
import {
  LoaderFunction,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/index.ts";
import { Layout, layoutLoader } from "./components/Layout";
import { Infrastructure } from "./components/Dash/Infrastructure/index.tsx";
import { Business } from "./components/Dash/Business/index.tsx";
import { Police } from "./components/Dash/Police/index.tsx";
import { Monitoring } from "./components/Dash/Monitoring/index.tsx";
import { Engineering } from "./components/Dash/Engineering/index.tsx";
import { UploadFile } from "./components/Dash/UploadFile/index.tsx";
import { Error } from "./components/Dash/Error/index.tsx";
import Theme from "./components/Theme/index.tsx";
import { valuesApi } from "./store/services/valuesApi.ts";
import { TabName } from "./types/types.ts";

const valuesLoader: LoaderFunction<TabName> = async ({ request, params }) => {
  const date = params.date;
  const urlArray = request.url.split("/");
  const tab = urlArray[3];

  const response = store.dispatch(
    valuesApi.endpoints.getValues.initiate({
      tab: tab as Exclude<TabName, "error" | "upload">,
      date: date as string,
    }),
  );

  const data = await response.unwrap();

  return { data, tab };
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={layoutLoader}>
      <Route
        path="infrastructure/:date"
        element={<Infrastructure />}
        loader={valuesLoader}
      />
      <Route
        path="business/:date"
        element={<Business />}
        loader={valuesLoader}
      />
      <Route path="police/:date" element={<Police />} loader={valuesLoader} />
      <Route
        path="monitoring/:date"
        element={<Monitoring />}
        loader={valuesLoader}
      />
      <Route
        path="engineering/:date"
        element={<Engineering />}
        loader={valuesLoader}
      />
      <Route path="upload" element={<UploadFile />} />
      <Route path="*" element={<Error />} />
    </Route>,
  ),
);

const App: FC = () => {
  return (
    <Provider store={store}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  );
};

export default App;
