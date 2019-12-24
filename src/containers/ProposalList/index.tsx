import React, { FormEvent } from 'react';
import { Table, THead, TBody, TRow, TH, TD } from 'pureUi/Table';
import { LinkButton } from 'pureUi/Buttons';
import { ProposalListStylesWrapper } from './ProposalListStylesWrapper';
import { Heading2 } from 'styles';
import TextInput from 'pureUi/TextInput';
import { Pagination } from 'pureUi/Pagination';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { IProposalsListItem } from 'services/BackendApi/types/ProposalsListResponse';
import { Search } from '@material-ui/icons';
import { formatDate } from 'utils';

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
} from 'store/modules/proposalsList/selectors';

import {
  getProposalListRequestAction,
  setFilterAction,
  setPageNumberAction,
  setSortAction,
} from 'store/modules/proposalsList/actions';

export class ProposalListContainer extends React.Component<IProposalListProps, {}> {
  componentDidMount() {
    this.props.getProposalListRequest();
  }

  handleFilterChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.setFilter(e.currentTarget.value);
  };

  handleSort = (sortBy: keyof IProposalsListItem) => () => {
    const newSortOrder = sortBy === this.props.sortBy && this.props.sortOrder === 'asc' ? 'desc' : 'asc';
    this.props.setSort(sortBy, newSortOrder);
  };

  handlePageChange = (pageNumber: number) => {
    console.log('handlePageChange', pageNumber);
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
          <TextInput
            className="filterInput"
            value={this.props.filter}
            onChange={this.handleFilterChange}
            placeholder="filter by ID or client"
          >
            <Search className="searchIcon"></Search>
          </TextInput>
        </div>

        {!this.props.requestPending && this.props.totalResults > 0 && (
          <Table className="table">
            <THead>
              <TRow>
                <TH sortOrder={this.getSortOrderForProp('uuid')} onClick={this.handleSort('uuid')} className="id">
                  ID
                </TH>
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
                <TH className="bookingCount centered">No. Bookings</TH>
                <TH className="hotelCount centered">No. Hotels</TH>
                <TH
                  sortOrder={this.getSortOrderForProp('comments')}
                  onClick={this.handleSort('comments')}
                  className="comments"
                >
                  Comments
                </TH>
                <TH className="actions">Actions</TH>
              </TRow>
            </THead>
            <TBody tableData={this.props.proposals!}>
              {(proposal: IProposalsListItem) => {
                const hotelCount = proposal.bookings.reduce((acc: Array<string | undefined>, next) => {
                  return acc.includes(next!.hotelUuid) ? acc : [...acc, next.hotelUuid];
                }, []).length;

                return (
                  <TRow key={proposal.uuid}>
                    <TD title={proposal.uuid}>{proposal.uuid}</TD>
                    <TD>{`${proposal.guestFirstName || ''} ${proposal.guestLastName || ''}`.trimLeft()}</TD>
                    <TD>{formatDate(proposal.createdAt, 'dd MMM yyyy')}</TD>
                    <TD className="centered">{proposal.bookings.length}</TD>
                    <TD className="centered">{hotelCount}</TD>
                    <TD title={proposal.comments}>{proposal.comments}</TD>
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
});

const actionCreators = {
  getProposalListRequest: getProposalListRequestAction,
  setFilter: setFilterAction,
  setPageNumber: setPageNumberAction,
  setSort: setSortAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IProposalListProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const ProposalListConnected = compose(withConnect)(ProposalListContainer);
