// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import { Modal } from 'semantic-ui-react';

import { createBooking } from 'store/modules/bookings/actions';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  margin-bottom: 20px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
  margin: 0px auto;
`;

const Title = Styled.H6.extend`
  margin-top: 40px;
  color: ${colors.black3};
  text-align: center;
`;

const Note = Styled.View.extend`
  width: 400px;
  margin: 20px auto;
`;

const Text = Styled.H5.extend`
  color: ${colors.gray11};
`;

const MainButton = Styled.Button.extend`
  width: 410px;
  margin-bottom: 40px;
  margin-top: 10px;
`;

const MainText = Styled.H7.extend`
  color: ${colors.white16};
`;

const SecondaryButton = Styled.Button.extend`
  width: 200px;
  margin-right: 10px;
`;

const SecondaryText = Styled.H7.extend`
  color: ${colors.white16};
`;

const OpenModalButton = () => <SecondaryText>TAKE OPTION</SecondaryText>;

class OptionsModal extends Component {
  constructor(props) {
    super();
    this.state = { showModal: false };
  }

  handleTakeOption = () => {
    this.setState({ showModal: false });
    const provisionalBookingValues = { ...this.props.bookingValues, status: 'provisional' };
    this.props.createBooking(provisionalBookingValues).then(() => {
      this.props.history.push(`/holds/`);
    });
  };

  render() {
    const timeUntilOptionRelease = () => {
      return moment()
        .add(1, 'days')
        .calendar();
    };

    return (
      <Modal
        style={{ width: '600px' }}
        trigger={
          <SecondaryButton onClick={() => this.setState({ showModal: true })}>
            <OpenModalButton />
          </SecondaryButton>
        }
        onClose={() => this.setState({ showModal: false })}
        open={this.state.showModal}
        centered={false}
        closeIcon
      >
        <Container>
          <Title> TAKE AN OPTION ON THIS BOOKING FOR 24 HOURS? </Title>
          <Row>
            <Note>
              <Text>
                Will hold the room(s) on your behalf for 24 hours. Unless you confirm the room in writing, by{' '}
                <strong>{timeUntilOptionRelease()}</strong> it will automatically released.
              </Text>
            </Note>
          </Row>
          <Row>
            <MainButton onClick={this.handleTakeOption}>
              <MainText>TAKE AN OPTION ON THIS BOOKING</MainText>
            </MainButton>
          </Row>
        </Container>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    undefined,
    { createBooking }
  )(OptionsModal)
);
