import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import UpLoadImg from './components/UpLoadImg';
import ShowImg from './components/ShowImg';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UpLoadImg} />
          <Route exact path="/search-img" component={ShowImg} />
          <Route exact path="*" component={UpLoadImg} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
