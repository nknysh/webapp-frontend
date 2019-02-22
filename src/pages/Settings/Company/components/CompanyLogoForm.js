// Libraries
import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';
import { uploadLogo } from 'actions/companies';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
`;

const UploadButton = Styled.Button.extend`
  margin-top: 20px;
  width: 200px;
`;

const UploadText = Styled.H7.extend`
  color: ${colors.white16};
`;

const Image = Styled.Image.extend`
  width: 200px;
  height: 200px;
`;

const Box = Styled.View.extend`
  width: 200px;
  height: 200px;
  background-color: ${colors.gray11};
`;

const Preview = ({ url }) => (url ? <Image source={{ uri: url, width: 200, height: 200 }} /> : <Box />);

class CompanyLogoForm extends React.Component {
  handleManual = () => {
    this._dropzone.open();
  };

  handleDrop = files => {
    // TODO(mark): Set companyId from the currentUser.
    const companyId = 1;

    this.props.uploadLogo({ file: files[0], id: companyId }).then(() => {
      // TODO(mark): Request company that received the upload to refresh the data.
    });
  };

  render() {
    return (
      <Container>
        <Dropzone ref={ref => (this._dropzone = ref)} onDrop={this.handleDrop} style={{ cursor: 'pointer' }}>
          <Preview url="" />
        </Dropzone>
        <UploadButton onPress={this.handleManual}>
          <UploadText>CHANGE LOGO</UploadText>
        </UploadButton>
      </Container>
    );
  }
}

export default connect(
  undefined,
  { uploadLogo }
)(CompanyLogoForm);
