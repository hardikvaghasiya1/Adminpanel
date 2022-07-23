import './App.css';
import { Route, Switch } from 'react-router-dom';
import Doctor from './Container/Doctor/Doctor';
import Medicine from './Container/Medicine/Medicine';
import Layout from './Component/Layout/Layout';
import { configuerStore } from './Redux/Store';
import Counter from './Container/Counter/Counter';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Promises from './Container/Promises/Promises';
import MemoExample from './Container/UseMemo/MemoExample';
import UseCallBackFun from './Container/UseCallBackFun/UseCallBackFun';

function App() {
  let { store, persistor } = configuerStore()
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <Switch>
              <Route exact path={"/doctor"} component={Doctor} />
              <Route exact path={"/medicine"} component={Medicine} />
              <Route exact path={"/counter"} component={Counter} />
              <Route exact path={"/promises"} component={Promises} />
              <Route exact path={"/memoexample"} component={MemoExample} />
              <Route exact path={"/usecallbackfun"} component={UseCallBackFun} />
            </Switch>
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}
export default App;