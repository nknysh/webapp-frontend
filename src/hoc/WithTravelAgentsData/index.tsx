import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  agentsSelector,
  isFetchingTaSelector,
  showTaDropdownSelector,
  taNameSearchSelector,
  taNamesSelector,
  selectedTaSelector,
  getTravelAgentsRequestAction,
  selectedTaChangeAction,
  searchTaByNameChangeAction,
  showTaDropdownAction,
} from 'store/modules/agents';
import { isSR } from 'store/modules/auth';

import { getTaFullName } from 'store/utils';

export interface IStateToProps {
  travelAgents: ReturnType<typeof agentsSelector>;
  isFetchingTA: ReturnType<typeof isFetchingTaSelector>;
  showTaDropdown: ReturnType<typeof showTaDropdownSelector>;
  taNames: ReturnType<typeof taNamesSelector>;
  taNameSearch: ReturnType<typeof taNameSearchSelector>;
}
const mapStateToProps = createStructuredSelector({
  travelAgents: agentsSelector,
  isFetchingTA: isFetchingTaSelector,
  showTaDropdown: showTaDropdownSelector,
  selectedTa: selectedTaSelector,
  taNames: taNamesSelector,
  taNameSearch: taNameSearchSelector,
  isSr: isSR,
});

const actionCreators = {
  getTravelAgents: getTravelAgentsRequestAction,
  selectedTaChange: selectedTaChangeAction,
  searchTaByNameChange: searchTaByNameChangeAction,
  showTaDropdownChange: showTaDropdownAction,
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);
type IDispatchToProps = typeof actionCreators;

export interface IWithTravelAgentsDataProps extends IStateToProps, IDispatchToProps {
  handleTaNameChange: (value: string) => void;
}

// ----------------------------------------------------------
// For testing purposes, create the class with a function so
// we can test the unconnected version
// ----------------------------------------------------------
export const makeWithTravelAgentsData = (WrappedComponent: any) =>
  class WithTravelAgentsData extends React.Component<IWithTravelAgentsDataProps, {}> {
    static displayName = `WithTravelAgentsData(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    componentDidMount() {
      if (this.props.isSr && !this.props.travelAgents) {
        this.props.getTravelAgents();
      }
    }

    handleTaNameChange = (taFullName: string) => {
      const agents = this.props.travelAgents || [];
      const selectedTA = agents.find(ta => getTaFullName(ta) === taFullName) || null;
      this.props.selectedTaChange(selectedTA);
    };

    render() {
      return <WrappedComponent {...this.props} handleTaNameChange={this.handleTaNameChange} />;
    }
  };

export const withTravelAgentsData = () => WrappedComponent => {
  const instance = makeWithTravelAgentsData(WrappedComponent);
  const withConnect = connect<IStateToProps, IDispatchToProps, IWithTravelAgentsDataProps>(mapStateToProps, mapDispatchToProps);

  const composed = compose(withConnect)(instance);

  return hoistNonReactStatics(composed, WrappedComponent);
};
