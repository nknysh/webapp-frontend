import React from 'react';

export const CombinationAndOrderingSection = props => {
  const { offer, offersOnHotel } = props;
  if (offer == null) {
    return null;
  }

  return (
    <section className="ordering-section">
      <ol>
        {offersOnHotel.map((offerOnHotel: any) => {
          return (
            <li key={offerOnHotel.uuid} className={offerOnHotel.uuid === offer.uuid ? 'active' : ''}>
              {offerOnHotel.name}
            </li>
          );
        })}
      </ol>
    </section>
  );
};
