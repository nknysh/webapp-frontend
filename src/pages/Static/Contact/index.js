// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Header, StaticHeader, Styled } from 'components';
import { Sidebar } from '../components';

const Container = Styled.View.extend`
`;

const Page = Styled.View.extend`
  flex-direction: row;
  align-self: center;
  width: 1160px;
  margin-top: 40px;
  margin-bottom: 100px;
`;

const Content = Styled.View.extend`
  flex: 1;
`;

const Title = Styled.H4.extend`
  color: ${colors.gold10};
  margin-bottom: 20px;
`;

const Line = Styled.View.extend`
  height: 2px;
  background-color: ${colors.gray15};
`;

const Section = Styled.View.extend`
  flex-direction: row;
  margin-top: 30px;
`;

const Paragraph = Styled.H7.extend`
  margin-vertical: 20px;
`;

const Item = Styled.View.extend`
  flex: 1;
`;

const LocationTitle = Styled.H6.extend`
  color: ${colors.gold10};
`;

const LocationAddress = Styled.H7.extend`
  margin-top: 10px;
  line-height: 22px;
`;

const LocationPhone = Styled.H7.extend`
`;

const Location = ({ title, address, phoneNumber }) => (
  <Item>
    <LocationTitle>{title}</LocationTitle>
    <LocationAddress>{address}</LocationAddress>
    <LocationPhone>{`TELEPHONE ${phoneNumber}`}</LocationPhone>
  </Item>
);

const Subtitle = Styled.H6.extend`
  color: ${colors.gold10};
`;

const EmailWrapper = Styled.View.extend`
`;

const Email = Styled.H7.extend`
  color: ${colors.green7};
  text-decoration-line: underline;
`;

const Contact = () => (
  <Container>
    <Header />
    <StaticHeader />
    <Page>
      <Sidebar title="Contact us" items={[]} />
      <Content>
        <Title>We would love to hear from you</Title>
        <Line />
        <Section>
          <Paragraph>
            To find out more about our collection of unique destinations and products, please contact us.
          </Paragraph>
        </Section>
        <Section>
          <Location
            title="SEYCHELLES"
            address={'SUITE 405, PREMIER BUILDING\nREVOLUTION AVENUE\nVICTORIA, MAHE, SEYCHELLES'}
            phoneNumber="+248 4224 811"
          />
          <Location
            title="MALDIVES"
            address={'MA. AFEESHA\nKURIKEELA MAGU\nMACHCHANGOLHI 20166\nMALE, REPUBLIC OF MALDIVES'}
            phoneNumber="+000 0000 000"
          />
        </Section>
        <Section>
          <Location
            title="DUBAI"
            address={'33J ALMAS TOWER\nALMAS CLUSTER\nJUMEIRAH LAKE TOWERS\nDUBAI, UAE'}
            phoneNumber="+971 (0)439 33100"
          />
          <Location
            title="UNITED KINGDOM"
            address={'ST. PETER PORT\nGUERNSEY GYI 2QJ\nUNITED KINGDOM'}
            phoneNumber="+44 (0)8447 365 985"
          />
        </Section>
        <Section>
          <EmailWrapper>
            <Subtitle>Email us</Subtitle>
            <a href="mailto:reservations@pure-escapes.com">
              <Email>RESERVATIONS@PURE-ESCAPES.COM</Email>
            </a>
          </EmailWrapper>
        </Section>
      </Content>
    </Page>
  </Container>
);

export default Contact;
