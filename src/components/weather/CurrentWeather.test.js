import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount} from "enzyme";
import CurrentWeather from './CurrentWeather';


configure({adapter: new Adapter()});
it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<CurrentWeather weatherList={[]} unit={""} setUnit={()=>{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
it("location dropdown", () => {
    const wrapper = shallow(<CurrentWeather weatherList={[]} unit={""} setUnit={()=>{}}/>);      
    expect(wrapper.find('.row').find('.col-md-12')).toEqual({});
  });