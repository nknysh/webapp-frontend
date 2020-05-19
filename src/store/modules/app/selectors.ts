import { createSelector } from 'store/utils';
import { IAppState } from './model';
import {bookingBuilderDomain} from "../bookingBuilder";

export const appState = (state: any): IAppState => state.app;

export const isAppDeprecatedSelector = createSelector(appState, app => {
  return app.isAppDeprecated;
});
