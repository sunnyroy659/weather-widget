import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount} from "enzyme";
import WeatherForecast from "./WeatherForecast";

configure({adapter: new Adapter()});
it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<WeatherForecast weatherList={[]} unit={""}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
it("location dropdown", () => {
    const wrapper = shallow(<WeatherForecast weatherList={[]} unit={""}/>);      
    expect(wrapper.find('.row').find('.col-md-2')).toEqual({});
  });