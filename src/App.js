import './App.css';
import { Route, Switch } from 'react-router-dom';
import Doctor from './Container/Doctor/Doctor';
import Medicine from './Container/Medicine/Medicine';
import Layout from './Component/Layout/Layout';

function App() {
  return (
    <>
    <Layout>
      <Switch>
        <Route exact path={"/doctor"} component={Doctor}/>
        <Route exact path={"/medicine"} component={Medicine}/>
      </Switch>
    </Layout>
    </>
  );
}
export default App;