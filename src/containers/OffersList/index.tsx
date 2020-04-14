import React, { FormEvent } from 'react';
import { Table, THead, TBody, TRow, TH, TD } from 'pureUi/Table';
import { LinkButton, PrimaryButton, SecondaryButton, ButtonBar, ButtonSpacer } from 'pureUi/Buttons';
import TextInput from 'pureUi/TextInput';
import { Pagination } from 'pureUi/Pagination';
import Checkbox from 'pureUi/Checkbox';
import Label from 'pureUi/Label';
import { StandardModal, ModalHeader, ModalContent, ModalFooter } from 'pureUi/Modal';
import DismissableNotification from 'pureUi/DismissableNotification';
import { Heading1, Heading2 } from 'styles';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { IOffersListItem } from 'services/BackendApi/types/OffersListResponse';
import { Search } from '@material-ui/icons';
import { OffersListStylesWrapper } from './OffersListStylesWrapper';
import { getUserCountryContext, isSR } from 'store/modules/auth';
import { Translation } from 'react-i18next';
import { PureSelect } from 'pureUi/forms/PureSelect';
import {
  requestPendingSelector,
  errorSelector,
  offersSelector,
  filterSelector,
  currentPageSelector,
  totalResultsSelector,
  sortBySelector,
  sortOrderSelector,
  pageCountSelector,
  bulkActionSelectedUuidsSelector,
  isBulkDeleteConfirmOpenSelector,
  selectedHotelSelector,
} from 'store/modules/offersList/selectors';
import { getBootstrapHotelsSelector } from 'store/modules/bootstrap/selectors';

import {
  getOffersListRequestAction,
  setFilterAction,
  setPageNumberAction,
  setSortAction,
  setSelectedTravelAgentAction,
  addOfferUuidToBulkActionSelectedUuidsAction,
  removeOfferUuidFromBulkActionSelectedUuidsAction,
  toggleIsBulkDeleteConfirmOpenAction,
  confirmRequestToDeleteOffersAction,
  dismissErrorAction,
  setSelectedHotelAction,
} from 'store/modules/offersList/actions';

import { getTravelAgentsRequestAction } from '../../store/modules/agents/actions';
import { travelAgentSelectOptionsSelector } from '../../store/modules/agents/selectors';

export class OffersListContainer extends React.Component<IOffersListProps> {
  componentDidMount() {
    this.props.getOffersListRequest();
  }

  handleFilterChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.setFilter(e.currentTarget.value);
  };

  handleSort = (sortBy: keyof IOffersListItem) => () => {
    const newSortOrder = sortBy === this.props.sortBy && this.props.sortOrder === 'asc' ? 'desc' : 'asc';
    this.props.setSort(sortBy, newSortOrder);
  };

  handlePageChange = (pageNumber: number) => {
    this.props.setPageNumber(pageNumber - 1);
  };

  getSortOrderForProp = (prop: keyof IOffersListItem) =>
    this.props.sortBy === prop ? this.props.sortOrder : undefined;

  getHeadingText = () => {
    let headingText = 'Offers - Loading...';
    if (!this.props.requestPending && this.props.totalResults > 0) {
      headingText = `Offers - ${this.props.totalResults} ${
        this.props.totalResults === 1 ? 'Result' : 'Results'
      } Found.`;
    }

    if (!this.props.requestPending && this.props.totalResults === 0) {
      headingText = 'Offers - No Results';
    }

    return headingText;
  };

  toggleOfferBulkActionSelection = offerUuid => {
    if (this.props.bulkActionSelectedUuids.includes(offerUuid)) {
      this.props.removeOfferUuidFromBulkActionSelectedUuids(offerUuid);
    } else {
      this.props.addOfferUuidToBulkActionSelectedUuids(offerUuid);
    }
  };

  setAllOffersBulkActionSelection = shouldAdd => {
    if (!this.props.offers) {
      return;
    }

    this.props.offers.forEach(offer => {
      if (shouldAdd) {
        this.props.addOfferUuidToBulkActionSelectedUuids(offer.uuid);
      } else {
        this.props.removeOfferUuidFromBulkActionSelectedUuids(offer.uuid);
      }
    });
  };

  handleDeleteSelectedOffers = () => {
    this.props.toggleIsBulkDeleteConfirmOpen();
  };

  handleConfirmDeleteSelectedOffers = () => {
    this.props.confirmRequestToDeleteOffers();
  };

  render() {
    const allOffersOnPageUuid = this.props.offers ? this.props.offers.map(offer => offer.uuid) : [];

    return (
      <OffersListStylesWrapper>
        <Heading2 className="heading">{this.getHeadingText()}</Heading2>

        <div className="settings">
          <Label text="Filter">
            <TextInput
              className="filterInput"
              value={this.props.filter}
              onChange={this.handleFilterChange}
              placeholder="filter by ID, client or name"
            >
              <Search className="searchIcon"></Search>
            </TextInput>
          </Label>

          <Label text="Hotel">
            <PureSelect
              value={this.props.selectedHotel}
              onChange={e => {
                this.props.setSelectedHotel(e.currentTarget.value);
              }}
            >
              <option value="">All hotels</option>
              {this.props.allHotels.map(hotel => (
                <option key={hotel.uuid} value={hotel.uuid}>
                  {hotel.name}
                </option>
              ))}
            </PureSelect>
          </Label>
        </div>

        {this.props.error && (
          <Translation>
            {t => (
              <div className="notification-wrapper">
                <DismissableNotification
                  type="error"
                  onDismiss={() => {
                    this.props.dismissError();
                  }}
                >
                  <p>{t('errors.' + this.props.error)}</p>
                </DismissableNotification>
              </div>
            )}
          </Translation>
        )}

        <div className="bulk-actions">
          <ButtonBar>
            <PrimaryButton
              className="bulk-action-delete"
              disabled={this.props.bulkActionSelectedUuids.length <= 0}
              onClick={this.handleDeleteSelectedOffers}
            >
              Delete Selected Offers
            </PrimaryButton>
            <ButtonSpacer />
            <LinkButton to="/offer/create">New Offer</LinkButton>
          </ButtonBar>
          {this.props.isBulkDeleteConfirmOpen && (
            <StandardModal onClose={this.props.toggleIsBulkDeleteConfirmOpen}>
              <ModalHeader>
                <Heading1>Delete Offers</Heading1>
              </ModalHeader>
              <ModalContent>
                <p>Are you sure you want to delete {this.props.bulkActionSelectedUuids.length} offers?</p>
                <p>
                  <strong>This action cannot be undone!</strong>
                </p>
              </ModalContent>
              <ModalFooter>
                <ButtonBar>
                  <SecondaryButton onClick={this.props.toggleIsBulkDeleteConfirmOpen}>Cancel</SecondaryButton>
                  <PrimaryButton autoFocus onClick={this.handleConfirmDeleteSelectedOffers}>
                    Delete
                  </PrimaryButton>
                </ButtonBar>
              </ModalFooter>
            </StandardModal>
          )}
        </div>

        {!this.props.requestPending && this.props.totalResults > 0 && (
          <Table className="table">
            <THead>
              <TRow>
                <TH className="bulk-action-column">
                  <Checkbox
                    checked={allOffersOnPageUuid.every(uuid => this.props.bulkActionSelectedUuids.includes(uuid))}
                    onChange={() => {
                      // if every offer on the page is already selected, set them off
                      if (allOffersOnPageUuid.every(uuid => this.props.bulkActionSelectedUuids.includes(uuid))) {
                        this.setAllOffersBulkActionSelection(false);
                      } else {
                        this.setAllOffersBulkActionSelection(true);
                      }
                    }}
                  />
                </TH>
                <TH sortOrder={this.getSortOrderForProp('name')} onClick={this.handleSort('name')} className="id">
                  Name
                </TH>
                <TH sortOrder={this.getSortOrderForProp('hotel.name')} onClick={this.handleSort('hotel.name')}>
                  Hotel
                </TH>
                <TH
                  sortOrder={this.getSortOrderForProp('hotel.countryCode')}
                  onClick={this.handleSort('hotel.countryCode')}
                >
                  Hotel Country Code
                </TH>
                <TH>Actions</TH>
              </TRow>
            </THead>
            <TBody tableData={this.props.offers!}>
              {(offer: IOffersListItem) => {
                return (
                  <TRow key={offer.uuid}>
                    <TD>
                      <Checkbox
                        checked={this.props.bulkActionSelectedUuids.includes(offer.uuid)}
                        onChange={() => {
                          this.toggleOfferBulkActionSelection(offer.uuid);
                        }}
                      />
                    </TD>
                    <TD title={offer.name}>{offer.name}</TD>
                    <TD title={offer.hotel.name}>{offer.hotel.name}</TD>
                    <TD title={offer.hotel.countryCode}>{offer.hotel.countryCode}</TD>
                    <TD>
                      <div className="link-button-wrapper">
                        <LinkButton className="link-button" to={`/offer/${offer.uuid}/view`}>
                          Show
                        </LinkButton>
                        <LinkButton className="link-button" to={`/offer/${offer.uuid}/edit`}>
                          Edit
                        </LinkButton>
                      </div>
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
      </OffersListStylesWrapper>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export interface IOffersListProps extends StateToProps, DispatchToProps {
  className: string;
  actingCountryCode: string;
  selectedTravelAgentUuid: string;
}

const mapStateToProps = createStructuredSelector({
  requestPending: requestPendingSelector,
  error: errorSelector,
  offers: offersSelector,
  filter: filterSelector,
  totalResults: totalResultsSelector,
  sortBy: sortBySelector,
  sortOrder: sortOrderSelector,
  currentPage: currentPageSelector,
  pageCount: pageCountSelector,
  actingCountryCode: getUserCountryContext,
  isSr: isSR,
  travelAgentSelectOptions: travelAgentSelectOptionsSelector,
  bulkActionSelectedUuids: bulkActionSelectedUuidsSelector,
  isBulkDeleteConfirmOpen: isBulkDeleteConfirmOpenSelector,
  selectedHotel: selectedHotelSelector,
  allHotels: getBootstrapHotelsSelector,
});

const actionCreators = {
  getOffersListRequest: getOffersListRequestAction,
  setFilter: setFilterAction,
  setPageNumber: setPageNumberAction,
  setSort: setSortAction,
  setSelectedTravelAgent: setSelectedTravelAgentAction,
  getTravelAgents: getTravelAgentsRequestAction,
  addOfferUuidToBulkActionSelectedUuids: addOfferUuidToBulkActionSelectedUuidsAction,
  removeOfferUuidFromBulkActionSelectedUuids: removeOfferUuidFromBulkActionSelectedUuidsAction,
  toggleIsBulkDeleteConfirmOpen: toggleIsBulkDeleteConfirmOpenAction,
  confirmRequestToDeleteOffers: confirmRequestToDeleteOffersAction,
  dismissError: dismissErrorAction,
  setSelectedHotel: setSelectedHotelAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IOffersListProps>(mapStateToProps, mapDispatchToProps);

export const OffersListConnected = compose(withConnect)(OffersListContainer);

export default OffersListConnected;
