import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectedCompanyAgents,
  selectedCompanyAgentsNames,
  companiesSelector,
  isFetchingTaSelector,
  showTaDropdownSelector,
  taNameSearchSelector,
  selectedTaSelector,
  selectedCompanySelector,
  isFetchingCompaniesSelector,
  companyNamesSelector,
  showCompanyDropdownSelector,
  companyNameSearchSelector,
  selectedTaChangeAction,
  searchTaByNameAction,
  showTaDropdownAction,
  getCompaniesRequestAction,
  selectedCompanyChangeAction,
  searchCompanyByNameAction,
  showCompanyDropdownAction,
} from 'store/modules/agents';
import { isSR } from 'store/modules/auth';

import { getTaFullName } from 'store/utils';

export interface IStateToProps {
  travelAgents: ReturnType<typeof selectedCompanyAgents>;
  isFetchingTA: ReturnType<typeof isFetchingTaSelector>;
  showTaDropdown: ReturnType<typeof showTaDropdownSelector>;
  selectedTa: ReturnType<typeof selectedTaSelector>;
  taNames: ReturnType<typeof selectedCompanyAgentsNames>;
  taNameSearch: ReturnType<typeof taNameSearchSelector>;
  isSr: ReturnType<typeof isSR>;

  companies: ReturnType<typeof companiesSelector>;
  isFetchingCompanies: ReturnType<typeof isFetchingCompaniesSelector>;
  companiesNames: ReturnType<typeof companyNamesSelector>;
  selectedCompany: ReturnType<typeof selectedCompanySelector>;
  showCompanyDropdown: ReturnType<typeof showCompanyDropdownSelector>;
  companyNameSearch: ReturnType<typeof companyNameSearchSelector>;
}
const mapStateToProps = createStructuredSelector({
  travelAgents: selectedCompanyAgents,
  isFetchingTA: isFetchingTaSelector,
  showTaDropdown: showTaDropdownSelector,
  selectedTa: selectedTaSelector,
  taNames: selectedCompanyAgentsNames,
  taNameSearch: taNameSearchSelector,
  isSr: isSR,

  companies: companiesSelector,
  isFetchingCompanies: isFetchingCompaniesSelector,
  companiesNames: companyNamesSelector,
  selectedCompany: selectedCompanySelector,
  showCompanyDropdown: showCompanyDropdownSelector,
  companyNameSearch: companyNameSearchSelector,
});

const actionCreators = {
  selectedTaChange: selectedTaChangeAction,
  searchTaByName: searchTaByNameAction,
  showTaDropdownChange: showTaDropdownAction,

  getCompanies: getCompaniesRequestAction,
  selectedCompanyChange: selectedCompanyChangeAction,
  searchCompanyByName: searchCompanyByNameAction,
  showCompanyDropdownChange: showCompanyDropdownAction,
};
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);
type IDispatchToProps = typeof actionCreators;

export interface IWithTravelAgentsDataProps extends IStateToProps, IDispatchToProps {
  handleTaNameChange: (value: string) => void;
  handleCompanyNameChange: (value: string) => void;
}

// ----------------------------------------------------------
// For testing purposes, create the class with a function so
// we can test the unconnected version
// ----------------------------------------------------------
export const makeWithTravelAgentsData = (WrappedComponent: any) =>
  class WithTravelAgentsData extends React.Component<IWithTravelAgentsDataProps, {}> {
    static displayName = `WithTravelAgentsData(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    componentDidMount() {
      if (this.props.isSr && !this.props.companies) {
        this.props.getCompanies();
      }
    }

    handleTaNameChange = (taFullName: string) => {
      const isNewTa = !this.props.selectedTa || getTaFullName(this.props.selectedTa) !== taFullName;
      if (isNewTa) {
        const agents = this.props.travelAgents || [];
        const selectedTA = agents.find(ta => getTaFullName(ta) === taFullName) || null;
        this.props.selectedTaChange(selectedTA);
      }
    };

    handleCompanyNameChange = (name: string) => {
      const isNewCompany = !this.props.selectedCompany || this.props.selectedCompany.name !== name;
      if (isNewCompany) {
        const companies = this.props.companies || [];
        const selectedCompany = companies.find(c => c.name === name) || null;
        this.props.selectedCompanyChange(selectedCompany);
      }
    };

    render() {
      return <WrappedComponent {...this.props} handleTaNameChange={this.handleTaNameChange} handleCompanyNameChange={this.handleCompanyNameChange} />;
    }
  };

export const withTravelAgentsData = () => WrappedComponent => {
  const instance = makeWithTravelAgentsData(WrappedComponent);
  const withConnect = connect<IStateToProps, IDispatchToProps, IWithTravelAgentsDataProps>(mapStateToProps, mapDispatchToProps);

  const composed = compose(withConnect)(instance);

  return hoistNonReactStatics(composed, WrappedComponent);
};
