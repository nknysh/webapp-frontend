import { configure } from '@storybook/react';
import './base.scss';

const req = require.context('../src/components', true, /\.stories\.jsx$/);

const loadStories = () => req.keys().forEach(req);

configure(loadStories, module);