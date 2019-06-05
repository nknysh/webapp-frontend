import React, { forwardRef, Fragment } from 'react';
import { prop, path, curry } from 'ramda';

import { Form, FormField, DatePicker } from 'components/elements';

import { getFormPath } from 'utils';

import { propTypes, defaultProps } from './BookingForm.props';
import { FormSection, FormSectionTitle, Columns, Column } from './BookingForm.styles';

const renderField = (name, value, field, { handleChange, handleBlur, errors }, checked) => (
  <FormField
    name={name}
    value={value}
    checked={checked}
    onChange={handleChange}
    onBlur={handleBlur}
    error={path(getFormPath(name), errors)}
    {...field}
  />
);

export const BookingForm = forwardRef(({ fields, validation, data, children, className, ...props }, ref) => {
  const onDateChange = curry((handler, name, type, value) => {
    handler({ target: { name, type, value } });
  });

  return (
    <div className={className}>
      <Form ref={ref} validationSchema={validation} {...props}>
        {({ values, ...formProps }) => (
          <Fragment>
            <FormSection>
              <FormSectionTitle>{path(['sections', 0], data)}</FormSectionTitle>
              {prop('guestTitle', fields) && (
                <Columns>
                  <Column>
                    {renderField('guestTitle', prop('guestTitle', values), prop('guestTitle', fields), formProps)}
                  </Column>
                </Columns>
              )}
              <Columns>
                {prop('guestFirstName', fields) && (
                  <Column>
                    {renderField(
                      'guestFirstName',
                      prop('guestFirstName', values),
                      prop('guestFirstName', fields),
                      formProps
                    )}
                  </Column>
                )}
                {prop('guestLastName', fields) && (
                  <Column>
                    {renderField(
                      'guestLastName',
                      prop('guestLastName', values),
                      prop('guestLastName', fields),
                      formProps
                    )}
                  </Column>
                )}
              </Columns>
              {prop('isRepeatGuest', fields) && (
                <Columns>
                  <Column>
                    {renderField(
                      'isRepeatGuest',
                      prop('isRepeatGuest', values),
                      prop('isRepeatGuest', fields),
                      formProps
                    )}
                  </Column>
                </Columns>
              )}
            </FormSection>
            {path(['sections', 1], data) && (
              <FormSection>
                <FormSectionTitle>{path(['sections', 1], data)}</FormSectionTitle>
                <Columns>
                  <Column>
                    <DatePicker
                      label={path(['flightArrivalDate', 'label'], fields)}
                      multiple={false}
                      onSelected={onDateChange(prop('handleChange', formProps), 'flightArrivalDate', 'date')}
                      selectedValues={prop('flightArrivalDate', values)}
                      placeholder=""
                    />
                  </Column>
                  <Column>
                    {renderField(
                      'flightArrivalNumber',
                      prop('flightArrivalNumber', values),
                      prop('flightArrivalNumber', fields),
                      formProps
                    )}
                  </Column>
                </Columns>
                <Columns>
                  <Column>
                    <DatePicker
                      label={path(['flightDepartureDate', 'label'], fields)}
                      multiple={false}
                      onSelected={onDateChange(prop('handleChange', formProps), 'flightDepartureDate', 'date')}
                      selectedValues={prop('flightDepartureDate', values)}
                      placeholder=""
                    />
                  </Column>
                  <Column>
                    {renderField(
                      'flightDepartureNumber',
                      prop('flightDepartureNumber', values),
                      prop('flightDepartureNumber', fields),
                      formProps
                    )}
                  </Column>
                </Columns>
              </FormSection>
            )}
            {path(['sections', 2], data) && (
              <FormSection>
                <FormSectionTitle>{path(['sections', 2], data)}</FormSectionTitle>
                <Columns>
                  <Column>
                    {renderField(
                      'specialRequests[cribCob]',
                      undefined,
                      path(['specialRequests', 'cribCob'], fields),
                      formProps,
                      path(['specialRequests', 'cribCob'], values)
                    )}
                    {renderField(
                      'specialRequests[adjacentRooms]',
                      undefined,
                      path(['specialRequests', 'adjacentRooms'], fields),
                      formProps,
                      path(['specialRequests', 'adjacentRooms'], values)
                    )}
                    {renderField(
                      'specialRequests[accessibleRoom]',
                      undefined,
                      path(['specialRequests', 'accessibleRoom'], fields),
                      formProps,
                      path(['specialRequests', 'accessibleRoom'], values)
                    )}
                  </Column>
                  <Column>
                    {renderField(
                      'specialRequests[bedGuard]',
                      undefined,
                      path(['specialRequests', 'bedGuard'], fields),
                      formProps,
                      path(['specialRequests', 'bedGuard'], values)
                    )}
                    {renderField(
                      'specialRequests[connectingRooms]',
                      undefined,
                      path(['specialRequests', 'connectingRooms'], fields),
                      formProps,
                      path(['specialRequests', 'connectingRooms'], values)
                    )}
                    {renderField(
                      'specialRequests[dietary]',
                      undefined,
                      path(['specialRequests', 'dietary'], fields),
                      formProps,
                      path(['specialRequests', 'dietary'], values)
                    )}
                  </Column>
                </Columns>
              </FormSection>
            )}
            {renderField('comments', prop('comments', values), prop('comments', fields), formProps)}
            {children}
          </Fragment>
        )}
      </Form>
    </div>
  );
});

BookingForm.displayName = 'BookingForm';
BookingForm.propTypes = propTypes;
BookingForm.defaultProps = defaultProps;

export default BookingForm;
