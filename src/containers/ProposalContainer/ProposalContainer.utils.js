import { lensProp, over, pick, take } from 'ramda';

export const simpleForm = pick(['guestTitle', 'guestFirstName', 'guestLastName', 'comments']);
export const withoutSections = over(lensProp('sections'), take(1));
