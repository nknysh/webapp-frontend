// Libraries
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// App
import { createComment } from 'store/modules/comments/actions';
import { getUser } from 'store/modules/users/selectors';
import { colors } from 'styles';

// Components
import { Form, Label, Styled, Connect } from 'components';

const Container = Styled.View.extend`
  flex: 1;  
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const CommentRow = Styled.View.extend`
  margin-vertical: 5px;
  max-width: 500px;
`;

const CommentsList = Styled.View.extend`
`;

const Text = Styled.H5.extend`
  max-width: 500px;
`;

const Content = Styled.View.extend`
`;

const Fields = Styled.View.extend`
  margin-top: 20px;
`;

const Field = Styled.View.extend`
`;

const Input = Styled.TextInput.H8.extend`
  margin-top: 10px;
  width: 400px;
`;

const Actions = Styled.View.extend`
  flex-direction: row;
  margin-vertical: 10px;
`;

const SubmitButton = Styled.Button.extend`
  width: 200px;
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
`;

const CommentDateFormatter = comment => moment(comment.createdAt).format('MMMM Do YYYY');

const Comments = comments =>
  comments.map(comment => (
    <Connect getState={state => ({ user: getUser(state, comment.commenterId) })} key={comment.id}>
      {({ user }) => (
        <CommentRow>
          <Row>
            <Text style={{ fontWeight: 'bold' }}>{comment.text}</Text>
          </Row>
          {user && (
            <Row>
              <Text style={{ color: `${colors.gray11}` }}>
                {`${user.firstName} ${user.lastName}`}, {CommentDateFormatter(comment)}
              </Text>
            </Row>
          )}
        </CommentRow>
      )}
    </Connect>
  ));

const CommentsForm = ({ comments, travelAgentId, createComment, user }) => (
  <Container>
    <Form
      initialValues={{
        text: '',
      }}
      onSubmit={values => {
        createComment({ id: travelAgentId, ...{ commenterId: user.id, ...values } });
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Content>
          <Fields>
            <Field>
              <Label htmlFor="comment">COMMENT</Label>
              <Input name="text" placeholder="" value={values.text} onChange={handleChange} onBlur={handleBlur} />
            </Field>
          </Fields>
          <Actions>
            <SubmitButton onPress={handleSubmit}>
              <SubmitText>LEAVE A COMMENT</SubmitText>
            </SubmitButton>
          </Actions>
        </Content>
      )}
    </Form>
    <CommentsList>{Comments(comments)}</CommentsList>
  </Container>
);

export default connect(
  undefined,
  { createComment }
)(CommentsForm);
