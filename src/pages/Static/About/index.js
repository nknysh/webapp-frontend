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
  margin-top: 30px;
`;

const SectionTitle = Styled.H7.extend`
  margin-top: 20px;
  color: ${colors.gold10};
  font-weight: 600;
  text-transform: uppercase;
`;

const Paragraph = Styled.H7.extend`
  margin-top: 20px;
`;

const About = () => (
  <Container>
    <Header />
    <StaticHeader />
    <Page>
      <Sidebar
        title="About us"
        items={[
          { name: 'WHO WE ARE', tag: 'who' },
          { name: 'WHY BOOK WITH US', tag: 'why' },
          { name: 'BEST PRICE GUARANTEE', tag: 'price' },
          { name: 'WHAT OUR MEMBERS SAY', tag: 'members' },
          { name: 'FAQS', tag: 'faqs' },
          { name: 'CAREERS', tag: 'careers' },
        ]}
      />
      <Content>
        <Title>Pure Escapes – the advantages are clear </Title>
        <Line />
        <Section>
          <Paragraph>
            A full-service destination management company with over 10 years’ experience, Pure Escapes is dedicated and
            trusted to creating the ultimate travel experiences for the most discerning travellers. As the only luxury
            specialist wholesaler in the Indian Ocean, we have an extensive network and long-standing relationships with
            leading luxury resorts and service providers. Today, with four global offices, over 30 multilingual staff,
            and a local presence, we have grown to become the world’s number one luxury resort seller.
          </Paragraph>
          <SectionTitle>FIRST PLACE</SectionTitle>
          <Paragraph>
            Being the number one seller of luxury resorts for both Maldives and Seychelles brings a host of advantages
            that we can pass on to travel agents and tour operators, and which you can pass onto your clients. We
            guarantee the best available rates, and from special offers to pre- allocated room nights, our access to the
            best resorts is second to none.
          </Paragraph>
          <SectionTitle>FIRST HAND</SectionTitle>
          <Paragraph>
            Nobody knows Maldives and Seychelles better. We extensively and continuously test every resort. Our team
            have strong personal relationships with all of the reservation teams and General Managers. Having our own
            ground handlers and multilingual guides means we can organise the most demanding and incredible excursions
            and experiences.
          </Paragraph>
          <SectionTitle>FIRST CLASS</SectionTitle>
          <Paragraph>
            Pure Escapes specialises in delivering the finest experiences that Maldives and Seychelles have to offer. We
            know every luxury resort intimately, and with a multitude of properties to choose from, we have the unique
            ability to help choose the resort that perfectly matches your clients’ taste, budget and needs. We also
            ensure that every other part of the experience is of the highest possible quality, from transfers and
            excursions, to private butlers and tour guides.
          </Paragraph>
        </Section>
      </Content>
    </Page>
  </Container>
);

export default About;
