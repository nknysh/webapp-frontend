import { configure, shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import '@babel/polyfill';

configure({adapter: new Adapter()});

global.shallow = shallow;
global.render = render;
global.mount = mount;

window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};