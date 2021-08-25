import Location from "./Location";
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount} from "enzyme";

configure({adapter: new Adapter()});
it('renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Location cityList={[]}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
it("location dropdown", () => {
    const wrapper = shallow(<Location cityList={[]}/>);      
    expect(wrapper.find('.row').find('.col-md-6').find('.loc').length).toBe(1);
  });
  