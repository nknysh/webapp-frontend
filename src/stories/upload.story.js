import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FileUpload from '../components/FileUpload'

storiesOf('Button', module)
  .add('with text', () => (
    <FileUpload placeholder="Upload Invoice" url="bookings/" id="3" />
  ))
  .add('with some emoji', () => (
    <FileUpload />
  )); 