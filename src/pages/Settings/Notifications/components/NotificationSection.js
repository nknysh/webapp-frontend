// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  padding: 30px;
  background-color: ${colors.gray16};
`;

const Title = Styled.H4.extend`
  color: ${colors.gold10};
`;

const Subtitle = Styled.H7.extend`
  margin-top: 40px;
  color: ${colors.black3};
`;

const Text = Styled.H7.extend`
  margin-top: 20px;
  color: ${colors.black3};
`;

const NotificationSection = () => (
  <Container>
    <Title>Notification Preferences</Title>
    <Subtitle>INTRODUCTION</Subtitle>
    <Text>
      Normally, we send you notifications as soon as anything happens with your account, such as when you take a hold, when you make a request, or when you make a booking.
    </Text>
    <Text>
      You can't choose not to receive these notifications. However, you can choose how you receive them.
    </Text>
    <Subtitle>CHOOSE HOW YOU ARE NOTIFIED</Subtitle>
    <Text>
      You automatically receive notifications by email at your registered email address. To select a different email address for receiving notifications, click Edit next to your registered email address.
    </Text>
    <Subtitle>IM ALERTS</Subtitle>
    <Text>
      IM stands for "instant messaging." You can subscribe to have message alerts sent to your chat window to notify you when anything happens on your account.
    </Text>
    <Text>
      Note: to subscribe to IM alerts, you need an account with an instant messaging provider, such as Skype or WhatsApp. This account needs to exist before you can subscribe for IM alerts.
    </Text>
  </Container>
);

export default NotificationSection;
