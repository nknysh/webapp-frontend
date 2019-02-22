// Libraries
import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';
import { uploadBookingInvoice } from 'store/modules/bookings/actions';

// Components
import Styled from '../Styled';

const SecondaryButton = Styled.Button.extend`
  width: 220px;
`;

const SecondaryText = Styled.H7.extend`
  color: ${colors.white16};
`;

const fileUpload = ({ uploadBookingInvoice, id }) => {
  const drop = data => {
    const file = new FormData();
    file.append('file', data[0]);
    uploadBookingInvoice({ file, id });
  };
  return (
    <Dropzone onDrop={drop} style={{ paddingTop: '20px' }} multiple={false} accept="application/pdf">
      <SecondaryButton>
        <SecondaryText>UPLOAD PDF FILE</SecondaryText>
      </SecondaryButton>
    </Dropzone>
  );
};

export default connect(
  undefined,
  { uploadBookingInvoice }
)(fileUpload);
