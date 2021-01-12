import { mount, createElement } from './v';
import App from './app';
import './style.scss';

const root = document.querySelector('#app');
mount(createElement(App), root);
