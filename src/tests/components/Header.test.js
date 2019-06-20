import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {shallow} from 'enzyme';
import Header from '../../components/Header';
test('Should render Header component', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper).toMatchSnapshot();
});