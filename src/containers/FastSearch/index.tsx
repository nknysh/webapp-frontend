import React, { memo, useEffect } from 'react';
import { SearchOptions, ErrorResponse } from 'services/BackendApi/types';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledFastSearchContainer from './styles';
import {
  searchOptionsSelector,
  searchOptionsPendingSelector,
  optionsRequestAction,
  OptionsRequestAction,
} from 'store/modules/fastSearch';

export class FastSearchContainer extends React.PureComponent<FastSearchProps, {}> {
  componentDidMount() {
    if (!this.props.searchOptions) {
      this.props.loadOptions();
    }
  }

  renderSideBar = () => (
    <div className="sidebar">
      {this.props.optionsRequestPending && <h2>Options Loading</h2>}
      {!this.props.optionsRequestPending && !this.props.optionsRequestError && (
        <h2>{this.props.optionsRequestError!.errors.map(e => e.title)}</h2>
      )}

      {!this.props.optionsRequestPending && this.props.searchOptions && (
        <>
          <h2>Options Loaded</h2>
          <pre>{JSON.stringify(this.props.searchOptions, null, 2)}</pre>
        </>
      )}
    </div>
  );

  render() {
    return (
      <StyledFastSearchContainer>
        <h1>Fast Search</h1>
      </StyledFastSearchContainer>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------

export interface StateToProps {
  optionsRequestPending: boolean;
  optionsRequestError: ErrorResponse;
  searchOptions: SearchOptions;
}

export interface DispatchToProps {
  loadOptions: typeof optionsRequestAction;
}

export interface FastSearchProps extends StateToProps, DispatchToProps {
  className: string;
}

const mapStateToProps = createStructuredSelector({
  searchOptionsPending: searchOptionsPendingSelector,
  searchOptions: searchOptionsSelector,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadOptions: optionsRequestAction,
    },
    dispatch
  );

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, FastSearchProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const FastSearchContainerConnected = compose(withConnect)(FastSearchContainer);
