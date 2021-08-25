import App from './App';
import ReactDOM from 'react-dom';
import Location from './components/location/Location';

it('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

