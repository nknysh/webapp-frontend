import React, { FormEvent } from 'react';
import { Table, THead, TBody, TRow, TH, TD } from 'pureUi/Table';
import { LinkButton } from 'pureUi/Buttons';
import { ProposalListStylesWrapper } from './ProposalListStylesWrapper';
import { Heading2 } from 'styles';
import TextInput from 'pureUi/TextInput';
import { Pagination } from 'pureUi/Pagination';
import Select from 'pureUi/Select';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { IProposalsListItem } from 'services/BackendApi/types/ProposalsListResponse';
import { Search } from '@material-ui/icons';
import { formatDate } from 'utils';
import { min, max } from 'date-fns';

import { getUserCountryContext, isSR } from 'store/modules/auth';

import {
  requestPendingSelector,
  errorSelector,
  proposalsSelector,
  filterSelector,
  currentPageSelector,
  totalResultsSelector,
  sortBySelector,
  sortOrderSelector,
  pageCountSelector,
  selectedTravelAgentUuidSelector,
} from 'store/modules/proposalsList/selectors';

import {
  getProposalListRequestAction,
  setFilterAction,
  setPageNumberAction,
  setSortAction,
  setSelectedTravelAgentAction,
} from 'store/modules/proposalsList/actions';

import { makeBackendApi } from 'services/BackendApi';

export class ProposalListContainer extends React.Component<IProposalListProps, IProposalListState> {
  constructor(props) {
    super(props);
    this.state = {
      travelAgentsForSelect: [{ value: null, label: 'None Selected' }],
    };
  }

  componentDidMount() {
    this.props.getProposalListRequest();

    // if we're not an SR, we don't need the travel agents
    if (!this.props.isSr) {
      return;
    }

    const backendApi = makeBackendApi(this.props.actingCountryCode);

    backendApi.getTravelAgents().then(res => {
      const travelAgentsForSelect = res.data.data.map(ta => {
        return {
          value: ta.uuid,
          label: `${ta.title}. ${ta.firstName} ${ta.lastName}`,
        };
      });
      travelAgentsForSelect.unshift({ value: null, label: 'None Selected' });
      this.setState({
        travelAgentsForSelect,
      });
    });
  }

  handleFilterChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.setFilter(e.currentTarget.value);
  };

  handleSort = (sortBy: keyof IProposalsListItem) => () => {
    const newSortOrder = sortBy === this.props.sortBy && this.props.sortOrder === 'asc' ? 'desc' : 'asc';
    this.props.setSort(sortBy, newSortOrder);
  };

  handlePageChange = (pageNumber: number) => {
    this.props.setPageNumber(pageNumber - 1);
  };

  getSortOrderForProp = (prop: keyof IProposalsListItem) =>
    this.props.sortBy === prop ? this.props.sortOrder : undefined;

  getHeadingText = () => {
    let headingText = 'Proposals - Loading...';
    if (!this.props.requestPending && this.props.totalResults > 0) {
      headingText = `Proposals - ${this.props.totalResults} ${
        this.props.totalResults === 1 ? 'Result' : 'Results'
      } Found.`;
    }

    if (!this.props.requestPending && this.props.totalResults === 0) {
      headingText = 'Proposals - No Results';
    }

    return headingText;
  };

  render() {
    return (
      <ProposalListStylesWrapper>
        <Heading2 className="heading">{this.getHeadingText()}</Heading2>
        <div className="settings">
          {this.props.isSr && (
            <div>
              <label>Travel Agent</label>
              <Select
                value={this.props.selectedTravelAgentUuid || ''}
                options={this.state.travelAgentsForSelect}
                onChange={e => {
                  this.props.setSelectedTravelAgent(e.target.value);
                }}
              />
            </div>
          )}
          <div>
            <label>Filter</label>
            <TextInput
              className="filterInput"
              value={this.props.filter}
              onChange={this.handleFilterChange}
              placeholder="filter by ID, client or name"
            >
              <Search className="searchIcon"></Search>
            </TextInput>
          </div>
        </div>

        {!this.props.requestPending && this.props.totalResults > 0 && (
          <Table className="table">
            <THead>
              <TRow>
                <TH sortOrder={this.getSortOrderForProp('uuid')} onClick={this.handleSort('uuid')} className="id">
                  ID
                </TH>
                <TH sortOrder={this.getSortOrderForProp('name')} onClick={this.handleSort('name')} className="id">
                  Name
                </TH>
                <TH>Travel Dates</TH>
                <TH
                  sortOrder={this.getSortOrderForProp('guestLastName')}
                  onClick={this.handleSort('guestLastName')}
                  className="client"
                >
                  Client
                </TH>
                <TH
                  sortOrder={this.getSortOrderForProp('createdAt')}
                  onClick={this.handleSort('createdAt')}
                  className="created"
                >
                  Created On
                </TH>
                <TH
                  sortOrder={this.getSortOrderForProp('updatedAt')}
                  onClick={this.handleSort('updatedAt')}
                  className="created"
                >
                  Updated On
                </TH>
                <TH className="bookingCount centered">No. Bookings</TH>
                <TH className="hotelCount centered">No. Hotels</TH>
                {this.props.isSr && <TH>Travel Agent</TH>}
                <TH>Is Sent?</TH>
                <TH className="actions">Actions</TH>
              </TRow>
            </THead>
            <TBody tableData={this.props.proposals!}>
              {(proposal: IProposalsListItem) => {
                const hotelCount = proposal.bookings.reduce((acc: Array<string | undefined>, next) => {
                  return acc.includes(next!.hotelUuid) ? acc : [...acc, next.hotelUuid];
                }, []).length;

                let travelDate = '';
                if (proposal.bookings.length >= 1) {
                  const earliestDate = min(proposal.bookings.map(b => new Date(b.checkInDate!)));
                  const latestDate = max(proposal.bookings.map(b => new Date(b.checkOutDate!)));
                  travelDate = `${formatDate(earliestDate)} - ${formatDate(latestDate)}`;
                }

                return (
                  <TRow key={proposal.uuid}>
                    <TD title={proposal.uuid}>{proposal.uuid}</TD>
                    <TD title={proposal.name}>{proposal.name}</TD>
                    <TD title={travelDate}>{travelDate}</TD>
                    <TD title={`${proposal.guestFirstName || ''} ${proposal.guestLastName || ''}`.trimLeft()}>
                      {`${proposal.guestFirstName || ''} ${proposal.guestLastName || ''}`.trimLeft()}
                    </TD>
                    <TD title={formatDate(proposal.createdAt, 'dd MMM yyyy')}>
                      {formatDate(proposal.createdAt, 'dd MMM yyyy')}
                    </TD>
                    <TD title={formatDate(proposal.updatedAt, 'dd MMM yyyy')}>
                      {formatDate(proposal.updatedAt, 'dd MMM yyyy')}
                    </TD>
                    <TD className="centered">{proposal.bookings.length}</TD>
                    <TD className="centered">{hotelCount}</TD>
                    {proposal.user && (
                      <TD>
                        {proposal.user.title}. {proposal.user.firstName} {proposal.user.lastName}
                      </TD>
                    )}
                    <TD>{proposal.isLocked ? 'Yes' : 'No'}</TD>
                    <TD>
                      <LinkButton to={`/proposals/${proposal.uuid}`}>Details</LinkButton>
                    </TD>
                  </TRow>
                );
              }}
            </TBody>
          </Table>
        )}

        {this.props.pageCount > 1 && (
          <Pagination
            className="pagination"
            onPageSelect={this.handlePageChange}
            pageCount={this.props.pageCount}
            currentPage={this.props.currentPage + 1}
          />
        )}
      </ProposalListStylesWrapper>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export interface IProposalListProps extends StateToProps, DispatchToProps {
  className: string;
  actingCountryCode: string;
  selectedTravelAgentUuid: string;
}

export interface IProposalListState {
  travelAgentsForSelect: any;
}

const mapStateToProps = createStructuredSelector({
  requestPending: requestPendingSelector,
  error: errorSelector,
  proposals: proposalsSelector,
  filter: filterSelector,
  totalResults: totalResultsSelector,
  sortBy: sortBySelector,
  sortOrder: sortOrderSelector,
  currentPage: currentPageSelector,
  pageCount: pageCountSelector,
  actingCountryCode: getUserCountryContext,
  selectedTravelAgentUuid: selectedTravelAgentUuidSelector,
  isSr: isSR,
});

const actionCreators = {
  getProposalListRequest: getProposalListRequestAction,
  setFilter: setFilterAction,
  setPageNumber: setPageNumberAction,
  setSort: setSortAction,
  setSelectedTravelAgent: setSelectedTravelAgentAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IProposalListProps>(mapStateToProps, mapDispatchToProps);

export const ProposalListConnected = compose(withConnect)(ProposalListContainer);
