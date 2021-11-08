import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
} from "react-router-dom";
import './index.scss';

import * as serviceWorker from './serviceWorker';
import { Helmet } from "react-helmet";
import Spinner from './components/Spinner/Spinner';

const Welcome = lazy(() => import('./components/welcome/Welcome'))
const Dashboard = lazy(() => import('./components/Dashboard/DashboardMain/DashboardMain'))
const Admin = lazy(() => import('./components/admin/Admin'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const Front = lazy(() => import('./components/Front/Front'))
const Exporter = lazy(() => import('./components/Exporter/Exporter'))
const Billing = lazy(() => import('./components/Billing/Plans/Plans'))
const CustomePage = lazy(() => import('./components/CustomPage/CustomePage'))


ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title></title>
      <link rel="canonical" href={window.location.href} />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
    </Helmet>
    <BrowserRouter  >
      <Suspense fallback={<Spinner />}>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/dashboard" render={(props) => <Dashboard {...props} />} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/resume/:step" component={Welcome} />
        <Route exact path="/billing/plans" render={(props) => <Billing {...props} />} />
        <Route exact path="/p/:custompage" render={(props) => <CustomePage {...props} />} />
        <Route path="/adm" render={(props) => <Admin {...props} />} />
        <Route exact path="/front" render={(props) => <Front {...props} />} />

        {/* Export routes*/}
        <Route exact path="/export/Cv1/:resumeId/:language" render={(props) => <Exporter resumeName="Cv1" export={true} {...props} />} />
        <Route exact path="/export/Cv2/:resumeId/:language" render={(props) => <Exporter resumeName="Cv2" export={true} {...props} />} />
        <Route exact path="/export/Cv3/:resumeId/:language" render={(props) => <Exporter resumeName="Cv3" export={true} {...props} />} />
        <Route exact path="/export/Cv4/:resumeId/:language" render={(props) => <Exporter resumeName="Cv4" export={true} {...props} />} />
        <Route exact path="/export/Cv5/:resumeId/:language" render={(props) => <Exporter resumeName="Cv5" export={true} {...props} />} />
        <Route exact path="/export/Cv6/:resumeId/:language" render={(props) => <Exporter resumeName="Cv6" export={true} {...props} />} />
        <Route exact path="/export/Cv7/:resumeId/:language" render={(props) => <Exporter resumeName="Cv7" export={true} {...props} />} />
        <Route exact path="/export/Cv8/:resumeId/:language" render={(props) => <Exporter resumeName="Cv8" export={true} {...props} />} />
        <Route exact path="/export/Cv9/:resumeId/:language" render={(props) => <Exporter resumeName="Cv9" export={true} {...props} />} />
        <Route exact path="/export/Cv10/:resumeId/:language" render={(props) => <Exporter resumeName="Cv10" export={true} {...props} />} />

      </Suspense>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
