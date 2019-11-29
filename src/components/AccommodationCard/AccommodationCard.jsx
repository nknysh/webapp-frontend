import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isAdult, formatPrice } from 'utils';
import LinkButton from 'components/LinkButton';
import { PrimaryButton } from 'pureUi/Buttons';

const renderDescription = info =>
  info.map((d, i) => (
    <p data-role="ac-description" key={i}>
      {d}
    </p>
  ));

const renderAmenities = amenities => (
  <ul data-role="ac-amenities-list" className="amenities">
    {amenities.map(v => (
      <li data-role="ac-amenity" key={v}>
        {v}
      </li>
    ))}
  </ul>
);

export const AccommodationCard = props => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => setExpanded(!expanded);
  const openLink = url => () => window.open(url, '_blank');
  const hasOffers = props.appliedOffers.length > 0;
  const onRequest = props.totals.oneOrMoreItemsOnRequest;

  const handleAdd = () => props.onRoomAdd(props.id);

  return (
    <div className={props.className} data-role="accomodation-cards">
      {props.availableToHold && <p className="canHold">{t('labels.availableToHoldGeneric')}</p>}
      {props.imageUri && <img data-role="ac-image" src={props.imageUri} />}
      <h1 data-role="ac-title" className="title">
        {props.title}
      </h1>
      <div className="innerWrapper">
        <div className="info">
          <ul className="occupancy">
            <li data-role="ac-size">{`${t('labels.roomSize')}: ${props.size} ${t('labels.squareMeters')}`}</li>
            <li data-role="ac-standard-occupancy">{`${t('labels.standardOccupancy')} - ${
              props.occupancy.standardOccupancy
            }`}</li>
            <li data-role="ac-max-occupancy">{`${t('labels.maxOccupancy')} - ${props.occupancy.maximumPeople}`}</li>
          </ul>

          <ul className="minMax">
            {props.occupancy.limits.map(limit => {
              const { name, minimum, maximum } = limit;
              return (
                <li data-role="ac-min-max-item" key={limit.name}>
                  {`${isAdult(name) ? t('adult_plural') : t(`${name}_plural`) || name}`} - {t('labels.max')} {maximum}{' '}
                  {t('labels.min')} {minimum}
                </li>
              );
            })}
          </ul>

          <ul className="actions">
            {props.brochures.map(brochure => (
              <li data-role="ac-brochure" key={brochure.uuid}>
                <LinkButton title={brochure.displayName} onClick={openLink(brochure.url)}>
                  + {brochure.displayName}
                </LinkButton>
              </li>
            ))}
            <li>
              {!expanded && (
                <LinkButton title={t('labels.moreInfo')} data-role="ac-more" onClick={toggleExpansion}>
                  + {t('labels.moreInfo')}
                </LinkButton>
              )}
              {expanded && (
                <LinkButton title={t('labels.lessInfo')} data-role="ac-less" onClick={toggleExpansion}>
                  - {t('labels.lessInfo')}
                </LinkButton>
              )}
            </li>
          </ul>
          {expanded && renderDescription([props.description, props.moreInformation])}
          {expanded && renderAmenities(props.amenities)}
        </div>

        <ul className="pricing">
          <li>
            <label>
              {t('labels.lodgingCountPrefix')} {props.count ? props.count : 0}
            </label>
            <br />
            <PrimaryButton className={'addLodgingButton'} onClick={handleAdd}>
              {t('labels.addLodging')}
            </PrimaryButton>
          </li>
          <li>{t('labels.totalNet')}</li>
          {onRequest && <li className="price">{t('labels.onRequest')}</li>}
          {!onRequest && <li className="price">{`${props.currencyCode}${formatPrice(props.totals.total)}`}</li>}
          {!onRequest && hasOffers && (
            <li className="priceBeforeDiscount">{`${props.currencyCode}${formatPrice(
              props.totals.totalBeforeDiscount
            )}`}</li>
          )}
          {props.appliedOffers.map(offer => (
            <li data-role="ac-offer" key={offer}>
              {offer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// These props they be crayzeee!
// Better selectors could reduce all this.
AccommodationCard.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  imageUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  description: PropTypes.string,
  moreInformation: PropTypes.string,
  amenities: PropTypes.arrayOf(PropTypes.string),
  appliedOffers: PropTypes.arrayOf(PropTypes.string),
  currencyCode: PropTypes.string.isRequired,
  size: PropTypes.number,
  updateInProgress: PropTypes.bool,
  availableToHold: PropTypes.bool,
  brochures: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      displayName: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  occupancy: PropTypes.shape({
    standardOccupancy: PropTypes.number,
    maximumPeople: PropTypes.number,
    limits: PropTypes.arrayOf(
      PropTypes.shape({
        maximum: PropTypes.number,
        minimum: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
  totals: PropTypes.shape({
    oneOrMoreItemsOnRequest: false,
    total: PropTypes.string,
    totalBeforeDiscount: PropTypes.string,
    totalBeforeDiscountForPricedItems: PropTypes.string,
    totalBeforeDiscountForPricedItemsCents: PropTypes.number,
    totalForPricedItems: PropTypes.string,
    totalForPricedItemsCents: PropTypes.number,
  }),
  onRoomAdd: PropTypes.func,
  onRoomRemove: PropTypes.func,
};

export default AccommodationCard;
