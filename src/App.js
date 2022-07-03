import './App.css';
import { Route, Switch } from 'react-router-dom';
import Doctor from './Container/Doctor/Doctor';
import Medicine from './Container/Medicine/Medicine';
import Layout from './Component/Layout/Layout';
import { configuerStore } from './Redux/Store';
import Counter from './Container/Counter/Counter';
import {Provider} from 'react-redux'

function App() {
  let store = configuerStore()
  return (
    <>
      <Layout>
        <Provider store={store}>
          <Switch>
            <Route exact path={"/doctor"} component={Doctor} />
            <Route exact path={"/medicine"} component={Medicine} />
            <Route exact path={"/counter"} component={Counter} />
          </Switch>
        </Provider>
      </Layout>
    </>
  );
}
export default App;