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
  margin-top: 20px;
  height: 2px;
  background-color: ${colors.gray15};
`;

const Section = Styled.View.extend`
  margin-top: 30px;
`;

const SectionTitle = Styled.H7.extend`
  color: ${colors.gold10};
  font-weight: 600;
  text-transform: uppercase;
`;

const Paragraph = Styled.H7.extend`
  margin-top: 20px;
`;

const Subtitle = Styled.H7.extend`
  margin-top: 20px;
  color: ${colors.gold4};
  font-weight: 600;
`;

const Item = Styled.H7.extend`
  margin-top: 10px;
`;

const Subitem = Styled.H7.extend`
  margin-left: 10px;
`;

const Privacy = () => (
  <Container>
    <Header />
    <StaticHeader />
    <Page>
      <Sidebar
        title="Privacy policy"
        items={[
          { name: '1 IMPORTANT INFORMATION AND WHO WE ARE', tag: '1' },
          { name: '2 THE DATA WE COLLECT ABOUT YOU', tag: '2' },
          { name: '3 HOW IS YOUR PERSONAL DATA COLLECTED', tag: '3' },
          { name: '4 HOW WE USE YOUR PERSONAL DATA', tag: '4' },
          { name: '5 DISCLOSURES OF YOUR PERSONAL DATA', tag: '5' },
          { name: '6 INTERNATIONAL TRANSFERS', tag: '6' },
          { name: '7 DATA SECURITY', tag: '7' },
          { name: '8 DATA RETENTION', tag: '8' },
          { name: '9 YOUR LEGAL RIGHTS', tag: '9' },
          { name: '10 GLOSSARY', tag: '10' },
        ]}
      />
      <Content>
        <Title />
        <Line />
        <Section>
          <SectionTitle>{`Welcome to the Pure Escapes's privacy policy`}</SectionTitle>
          <Paragraph>
            Pure Escapes respects your privacy and is committed to protecting your personal data. This privacy policy
            will inform you as to how we look after your personal data when you visit our website (regardless of where
            you visit it from) and tell you about your privacy rights and how the law protects you.
          </Paragraph>
          <Paragraph>
            This privacy policy is provided in a layered format so you can click through to the specific areas set out
            below. Please also use the Glossary to understand the meaning of some of the terms used in this privacy
            policy.
          </Paragraph>
        </Section>
        <Line />
        <Section>
          <SectionTitle>{`1. Important information and who we are`}</SectionTitle>
          <Subtitle>Purpose of this privacy policy</Subtitle>
          <Paragraph>
            This privacy policy aims to give you information on how Pure Escapes collects and processes your personal
            data through your use of this website, including any data you may provide through this website when you sign
            up to our newsletter or service or book online.
          </Paragraph>
          <Paragraph>
            This website is not intended for children and we do not knowingly collect data relating to children.
          </Paragraph>
          <Paragraph>
            It is important that you read this privacy policy together with any other privacy policy or fair processing
            policy we may provide on specific occasions when we are collecting or processing personal data about you so
            that you are fully aware of how and why we are using your data. This privacy policy supplements other
            notices and privacy policies and is not intended to override them.
          </Paragraph>
          <Subtitle>Controller</Subtitle>
          <Paragraph>
            Pure escapes is made up of different legal entities, details of which can be found here: This privacy policy
            is issued on behalf of the Pure Escapes Group so when we mention "COMPANY", "we", "us" or "our" in this
            privacy policy, we are referring to the Group as a whole responsible for processing your data. PST Ltd (t/a
            Pure Escapes) is the controller and responsible for this website.
          </Paragraph>
          <Paragraph>
            We have appointed a data protection officer (DPO) who is responsible for overseeing questions in relation to
            this privacy policy. If you have any questions about this privacy policy, please contact the DPO using the
            details set out below.
          </Paragraph>
          <Subtitle>Contact details</Subtitle>
          <Paragraph>
            If you have any questions about this privacy policy or our privacy practices, please contact our DPO in the
            following ways:
          </Paragraph>
          <Paragraph>Full name of legal entity: PST Limited (t/a Pure Escapes)</Paragraph>
          <Paragraph>Email address: greg@pure-escapes.com</Paragraph>
          <Paragraph>Postal address: Roseneath, St Peter Port, Guernsey, GY1 1DY</Paragraph>
          <Paragraph>
            You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the
            Guernsey supervisory authority for data protection issues (www.ico.org.uk). We would, however, appreciate
            the chance to deal with your concerns before you approach the ICO so please contact us in the first
            instance.
          </Paragraph>
          <Subtitle>Changes to the privacy policy and your duty to inform us of changes</Subtitle>
          <Paragraph>
            We keep our privacy policy under regular review. This version was last updated on September 2018.
          </Paragraph>
          <Paragraph>
            It is important that the personal data we hold about you is accurate and current. Please keep us informed if
            your personal data changes during your relationship with us.
          </Paragraph>
          <Subtitle>Third-party links</Subtitle>
          <Paragraph>
            This website may include links to third-party websites, plug-ins and applications. Clicking on those links
            or enabling those connections may allow third parties to collect or share data about you. We do not control
            these third-party websites and are not responsible for their privacy statements. When you leave our website,
            we encourage you to read the privacy policy of every website you visit.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>{`2. The data we collect about you`}</SectionTitle>
          <Paragraph>
            Personal data, or personal information, means any information about an individual from which that person can
            be identified. It does not include data where the identity has been removed (anonymous data).
          </Paragraph>
          <Paragraph>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped
            together as follows:
          </Paragraph>
          <ul>
            <li>
              <Item>
                Identity Data includes first name, maiden name, last name, username or similar identifier, marital
                status, title, date of birth and gender.
              </Item>
            </li>
            <li>
              <Item>Contact Data includes billing address, delivery address, email address and telephone numbers.</Item>
            </li>
            <li>
              <Item>Financial Data includes bank account and payment card details.</Item>
            </li>
            <li>
              <Item>
                Transaction Data includes details about payments to and from you and other details of products and
                services you have purchased from us.
              </Item>
            </li>
            <li>
              <Item>
                Technical Data includes internet protocol (IP) address, your login data, browser type and version, time
                zone setting and location, browser plug-in types and versions, operating system and platform, and other
                technology on the devices you use to access this website.
              </Item>
            </li>
            <li>
              <Item>
                Profile Data includes your username and password, bookings made by you, your interests, preferences,
                feedback and survey responses].
              </Item>
            </li>
            <li>
              <Item>Usage Data includes information about how you use our website, products and services.</Item>
            </li>
            <li>
              <Item>
                Marketing and Communications Data includes your preferences in receiving marketing from us and our third
                parties and your communication preferences.
              </Item>
            </li>
          </ul>
          <Paragraph>
            We also collect, use and share Aggregated Data such as statistical or demographic data for any purpose.
            Aggregated Data could be derived from your personal data but is not considered personal data in law as this
            data will not directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to
            calculate the percentage of users accessing a specific website feature. However, if we combine or connect
            Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the
            combined data as personal data which will be used in accordance with this privacy policy.
          </Paragraph>
          <Paragraph>
            We do not collect any Special Categories of Personal Data about you (this includes details about your race
            or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade
            union membership, information about your health, and genetic and biometric data). Nor do we collect any
            information about criminal convictions and offences.
          </Paragraph>
          <Subtitle>If you fail to provide personal data</Subtitle>
          <Paragraph>
            Where we need to collect personal data by law, or under the terms of a contract we have with you, and you
            fail to provide that data when requested, we may not be able to perform the contract we have or are trying
            to enter into with you (for example, to provide you with goods or services). In this case, we may have to
            cancel a product or service you have with us but we will notify you if this is the case at the time.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>{`3. How is your personal data collected?`}</SectionTitle>
          <Paragraph>We use different methods to collect data from and about you including through:</Paragraph>
          <ul>
            <li>
              <Item>
                Direct interactions. You may give us your Identity, Contact and Financial Data by filling in forms or by
                corresponding with us by post, phone, email or otherwise. This includes personal data you provide when
                you:
              </Item>
              <ul>
                <li>
                  <Subitem>apply for our products or services;</Subitem>
                </li>
                <li>
                  <Subitem>create an account on our website;</Subitem>
                </li>
                <li>
                  <Subitem>subscribe to our service or publications;</Subitem>
                </li>
                <li>
                  <Subitem>request marketing to be sent to you; or</Subitem>
                </li>
                <li>
                  <Subitem>give us feedback or contact us.</Subitem>
                </li>
              </ul>
            </li>
            <li>
              <Item>
                Automated technologies or interactions. As you interact with our website, we will automatically collect
                Technical Data about your equipment, browsing actions and patterns. We collect this personal data by
                using cookies[, server logs] and other similar technologies. We may also receive Technical Data about
                you if you visit other websites employing our cookies. Please see our cookie policy [LINK] for further
                details.
              </Item>
            </li>
            <li>
              <Item>
                Third parties or publicly available sources. We will receive personal data about you from various third
                parties [and public sources] as set out below Technical Data from the following partiesanalytics
                providers such as Google based outside the EU;
              </Item>
            </li>
            <li>
              <Item>
                Contact, Financial and Transaction Data from providers of technical, payment and delivery services such
                as WEX based inside and outside the EU.
              </Item>
            </li>
            <li>
              <Item>
                Identity and Contact Data from publicly available sources such as Companies House and the Electoral
                Register based inside the EU.
              </Item>
            </li>
          </ul>
        </Section>
        <Section>
          <SectionTitle>{`4. How we use your personal data`}</SectionTitle>
          <Paragraph>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
            in the following circumstances:
          </Paragraph>
          <ul>
            <li>
              <Item>
                Where we need to perform the contract we are about to enter into or have entered into with you.
              </Item>
            </li>
            <li>
              <Item>
                Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                fundamental rights do not override those interests.
              </Item>
            </li>
            <li>
              <Item>Where we need to comply with a legal obligation.</Item>
            </li>
          </ul>
          <Paragraph>
            Generally, we do not rely on consent as a legal basis for processing your personal data although we will get
            your consent before sending third party direct marketing communications to you via email or text message.
            You have the right to withdraw consent to marketing at any time by contacting us.
          </Paragraph>
          <Subtitle>Purposes for which we will use your personal data</Subtitle>
          <Paragraph>
            We have set out below, in a table format, a description of all the ways we plan to use your personal data,
            and which of the legal bases we rely on to do so. We have also identified what our legitimate interests are
            where appropriate.
          </Paragraph>
          <Paragraph>
            Note that we may process your personal data for more than one lawful ground depending on the specific
            purpose for which we are using your data. Please contact us if you need details about the specific legal
            ground we are relying on to process your personal data where more than one ground has been set out in the
            table below.
          </Paragraph>
          <Subtitle>Marketing</Subtitle>
          <Paragraph>
            We strive to provide you with choices regarding certain personal data uses, particularly around marketing
            and advertising.
          </Paragraph>
          <Subtitle>Promotional offers from us</Subtitle>
          <Paragraph>
            We may use your Identity, Contact, Technical, Usage and Profile Data to form a view on what we think you may
            want or need, or what may be of interest to you. This is how we decide which products, services and offers
            may be relevant for you (we call this marketing).
          </Paragraph>
          <Paragraph>
            You will receive marketing communications from us if you have requested information from us or purchased
            [goods or services] from us and you have not opted out of receiving that marketing.
          </Paragraph>
          <Subtitle>Third-party marketing</Subtitle>
          <Paragraph>
            We will get your express opt-in consent before we share your personal data with any third party for
            marketing purposes.
          </Paragraph>
          <Subtitle>Opting out</Subtitle>
          <Paragraph>
            You can ask us or third parties to stop sending you marketing messages at any time by contacting us at any
            time.
          </Paragraph>
          <Paragraph>
            Where you opt out of receiving these marketing messages, this will not apply to personal data provided to us
            as a result of [a product/service purchase, warranty registration, product/service experience or other
            transactions.
          </Paragraph>
          <Subtitle>Cookies</Subtitle>
          <Paragraph>
            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access
            cookies. If you disable or refuse cookies, please note that some parts of this website may become
            inaccessible or not function properly.
          </Paragraph>
          <Subtitle>Change of purpose</Subtitle>
          <Paragraph>
            We will only use your personal data for the purposes for which we collected it, unless we reasonably
            consider that we need to use it for another reason and that reason is compatible with the original purpose.
            If you wish to get an explanation as to how the processing for the new purpose is compatible with the
            original purpose, please contact us.
          </Paragraph>
          <Paragraph>
            If we need to use your personal data for an unrelated purpose, we will notify you and we will explain the
            legal basis which allows us to do so.
          </Paragraph>
          <Paragraph>
            Please note that we may process your personal data without your knowledge or consent, in compliance with the
            above rules, where this is required or permitted by law.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>{`5.  Disclosures of your personal data`}</SectionTitle>
          <Paragraph>
            We may share your personal data with the parties set out below for the purposes set out in the table above.
          </Paragraph>
          <ul>
            <li>
              <Item>Internal Third Parties as set out in the Glossary.</Item>
            </li>
            <li>
              <Item>External Third Parties as set out in the [Glossary] but particularly hotels and resorts.</Item>
            </li>
            <li>
              <Item>Other companies within the Pure Escapes Group</Item>
            </li>
            <li>
              <Item>
                Third parties to whom we may choose to sell, transfer or merge parts of our business or our assets.
                Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our
                business, then the new owners may use your personal data in the same way as set out in this privacy
                policy.
              </Item>
            </li>
          </ul>
          <Paragraph>
            We require all third parties to respect the security of your personal data and to treat it in accordance
            with the law. We do not allow our third-party service providers to use your personal data for their own
            purposes and only permit them to process your personal data for specified purposes and in accordance with
            our instructions.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>{`6.  International transfers`}</SectionTitle>
          <Paragraph>
            IF TRANSFERS OUT OF EEA OCCUR: We share your personal data within the Pure Escapes Group. This will involve
            transferring your data outside the European Economic Area (EEA).]
          </Paragraph>
          <Paragraph>
            [IF BINDING CORPORATE RULES ARE USED:] [We ensure your personal data is protected by requiring all our group
            companies to follow the same rules when processing your personal data. These rules are called "binding
            corporate rules".
          </Paragraph>
          <Paragraph>
            Many of our external third parties are based outside the EEA so their processing of your personal data will
            involve a transfer of data outside the EEA.
          </Paragraph>
          <Paragraph>
            Whenever we transfer your personal data out of the EEA, we ensure a similar degree of protection is afforded
            to it by ensuring at least one of the following safeguards is implemented [DELETE AS APPLICABLE]:
          </Paragraph>
          <ul>
            <li>
              <Item>
                Where we use certain service providers, we may use specific contracts approved by the European
                Commission which give personal data the same protection it has in Europe. For further details, see
                European Commission: Model contracts for the transfer of personal data to third countries.
              </Item>
            </li>
            <li>
              <Item>
                Where we use providers based in the US, we may transfer data to them if they are part of the Privacy
                Shield which requires them to provide similar protection to personal data shared between Europe and the
                US. For further details, see European Commission: EU-US Privacy Shield.
              </Item>
            </li>
          </ul>
          <Paragraph>
            Please contact us if you want further information on the specific mechanism used by us when transferring
            your personal data out of the EEA.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>{`7.  Data security`}</SectionTitle>
          <Paragraph>
            We have put in place appropriate security measures to prevent your personal data from being accidentally
            lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your
            personal data to those employees, agents, contractors and other third parties who have a business need to
            know. They will only process your personal data on our instructions and they are subject to a duty of
            confidentiality.
          </Paragraph>
          <Paragraph>
            We have put in place procedures to deal with any suspected personal data breach and will notify you and any
            applicable regulator of a breach where we are legally required to do so.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>{`8.  Data retention`}</SectionTitle>
          <Subtitle>How long will you use my personal data for?</Subtitle>
          <Paragraph>
            We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we
            collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or
            reporting requirements. We may retain your personal data for a longer period in the event of a complaint or
            if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
          </Paragraph>
          <Paragraph>
            To determine the appropriate retention period for personal data, we consider the amount, nature and
            sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of your
            personal data, the purposes for which we process your personal data and whether we can achieve those
            purposes through other means, and the applicable legal, regulatory, tax, accounting or other requirements.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>{`9.  Your legal rights`}</SectionTitle>
          <Paragraph>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data.
            Please click on the links below to find out more about these rights:
          </Paragraph>
          <ul>
            <li>
              <Item>Request access to your personal data.</Item>
            </li>
            <li>
              <Item>Request correction of your personal data.</Item>
            </li>
            <li>
              <Item>Request erasure of your personal data.</Item>
            </li>
            <li>
              <Item>Object to processing of your personal data.</Item>
            </li>
            <li>
              <Item>Request restriction of processing your personal data.</Item>
            </li>
            <li>
              <Item>Request transfer of your personal data.</Item>
            </li>
            <li>
              <Item>Right to withdraw consent.</Item>
            </li>
          </ul>
          <Paragraph>
            If you wish to exercise any of the rights set out above, please contact us on greg@pure-escapes.com
          </Paragraph>
          <Subtitle>No fee usually required</Subtitle>
          <Paragraph>
            You will not have to pay a fee to access your personal data (or to exercise any of the other rights).
            However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive.
            Alternatively, we could refuse to comply with your request in these circumstances.
          </Paragraph>
          <Subtitle>What we may need from you</Subtitle>
          <Paragraph>
            We may need to request specific information from you to help us confirm your identity and ensure your right
            to access your personal data (or to exercise any of your other rights). This is a security measure to ensure
            that personal data is not disclosed to any person who has no right to receive it. We may also contact you to
            ask you for further information in relation to your request to speed up our response.
          </Paragraph>
          <Subtitle>Time limit to respond</Subtitle>
          <Paragraph>
            We try to respond to all legitimate requests within one month. Occasionally it could take us longer than a
            month if your request is particularly complex or you have made a number of requests. In this case, we will
            notify you and keep you updated.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>{`10. Glossary`}</SectionTitle>
          <Subtitle>LAWFUL BASIS</Subtitle>
          <Paragraph>
            Legitimate Interest means the interest of our business in conducting and managing our business to enable us
            to give you the best service/product and the best and most secure experience. We make sure we consider and
            balance any potential impact on you (both positive and negative) and your rights before we process your
            personal data for our legitimate interests. We do not use your personal data for activities where our
            interests are overridden by the impact on you (unless we have your consent or are otherwise required or
            permitted to by law). You can obtain further information about how we assess our legitimate interests
            against any potential impact on you in respect of specific activities by contacting us.
          </Paragraph>
          <Paragraph>
            Performance of Contract means processing your data where it is necessary for the performance of a contract
            to which you are a party or to take steps at your request before entering into such a contract.
          </Paragraph>
          <Paragraph>
            Comply with a legal obligation means processing your personal data where it is necessary for compliance with
            a legal obligation that we are subject to.
          </Paragraph>
          <Subtitle>THIRD PARTIES</Subtitle>
          <Subtitle>Internal Third Parties</Subtitle>
          <Paragraph>
            Other companies in the Pure Escapes Group acting as joint controllers or processors and who are based Dubai,
            Maldives or Seychelles and provide [IT and system administration services and undertake leadership
            reporting.
          </Paragraph>
          <Subtitle>External Third Parties</Subtitle>
          <ul>
            <li>
              <Item>
                Service providers acting as processors based Dubai, Maldives and Seychelles who provide [IT and system
                administration services.
              </Item>
            </li>
            <li>
              <Item>
                Professional advisers] including lawyers, bankers, auditors and insurers based in Dubai, France,
                Maldives, Seychelles, US and the UK who provide consultancy, banking, legal, insurance and accounting
                services.
              </Item>
            </li>
          </ul>
          <Subtitle>YOUR LEGAL RIGHTS</Subtitle>
          <Paragraph>You have the right to:</Paragraph>
          <Paragraph>
            Request access to your personal data (commonly known as a "data subject access request"). This enables you
            to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.
          </Paragraph>
          <Paragraph>
            Request correction of the personal data that we hold about you. This enables you to have any incomplete or
            inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you
            provide to us.
          </Paragraph>
          <Paragraph>
            Request erasure of your personal data. This enables you to ask us to delete or remove personal data where
            there is no good reason for us continuing to process it. You also have the right to ask us to delete or
            remove your personal data where you have successfully exercised your right to object to processing (see
            below), where we may have processed your information unlawfully or where we are required to erase your
            personal data to comply with local law. Note, however, that we may not always be able to comply with your
            request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of
            your request.
          </Paragraph>
          <Paragraph>
            Object to processing of your personal data where we are relying on a legitimate interest (or those of a
            third party) and there is something about your particular situation which makes you want to object to
            processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the
            right to object where we are processing your personal data for direct marketing purposes. In some cases, we
            may demonstrate that we have compelling legitimate grounds to process your information which override your
            rights and freedoms.
          </Paragraph>
          <Paragraph>
            Request restriction of processing of your personal data. This enables you to ask us to suspend the
            processing of your personal data in the following scenarios:
          </Paragraph>
          <ul>
            <li>
              <Item>If you want us to establish the data's accuracy.</Item>
            </li>
            <li>
              <Item>Where our use of the data is unlawful but you do not want us to erase it.</Item>
            </li>
            <li>
              <Item>
                Where you need us to hold the data even if we no longer require it as you need it to establish, exercise
                or defend legal claims.
              </Item>
            </li>
            <li>
              <Item>
                You have objected to our use of your data but we need to verify whether we have overriding legitimate
                grounds to use it.
              </Item>
            </li>
          </ul>
          <Paragraph>
            Request the transfer of your personal data to you or to a third party. We will provide to you, or a third
            party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that
            this right only applies to automated information which you initially provided consent for us to use or where
            we used the information to perform a contract with you.
          </Paragraph>
          <Paragraph>
            Withdraw consent at any time where we are relying on consent to process your personal data. However, this
            will not affect the lawfulness of any processing carried out before you withdraw your consent. If you
            withdraw your consent, we may not be able to provide certain products or services to you. We will advise you
            if this is the case at the time you withdraw your consent.
          </Paragraph>
          <Paragraph>
            Governing Law: This Privacy Policy and any disputes hereunder shall be governed by the laws of Barbados
            applicable therein, and you hereby submit and attorn to those jurisdictions in relation thereto.
          </Paragraph>
        </Section>
      </Content>
    </Page>
  </Container>
);

export default Privacy;
