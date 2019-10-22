import styled from 'styled-components';
import AccommodationCard from './AccommodationCard.jsx';
import { theme } from 'styles';

export default styled(AccommodationCard)`
  position: relative;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.backgrounds.secondary};
  color: ${theme.palette.light};
  line-height: 20px;
  margin-bottom: 1rem;

  .canHold {
    background: white;
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    padding: 0.5rem;
    margin: 0;
    text-transform: uppercase;
    color: ${theme.palette.primary};
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .innerWrapper {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    padding: 0 1rem;
  }

  .title {
    color: ${theme.palette.primary};
    font-family: ${theme.fonts.headingFont};
    font-size: 20px;
    line-height: 32px;
    margin: 1rem 4%;
  }

  .pricing,
  .info {
    display: flex;
    flex-direction: column;
  }

  ul.pricing {
    text-transform: uppercase;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-shrink: 0;
    color: ${theme.palette.light};
    font-size: 14px;
  }

  .info {
    text-transform: uppercase;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .price {
    font-size: 22.4px;
    color: ${theme.colors['red-fade']};
    margin-top: 14px;
    margin-bottom: 6px;
  }

  .priceBeforeDiscount {
    font-size: 19.2px;
    text-decoration: line-through;
    margin-bottom: 14px;
  }

  .actions {
    list-style: none;
    margin: 1rem 0;
    padding: 0;
  }

  .numberSelect {
    margin-bottom: 17px;
    width: 88px;
  }

  ul.occupancy {
    margin: 1rem 0 0 0;
    padding: 0;
    list-style: none;
  }

  ul.minMax,
  ul.amenities {
    padding-left: 1rem;
  }

  .linkButton {
    border: none;
    background: transparent;
    color: ${theme.palette.primary};
    font-family: inherit;
    font-size: inherit;
    font-weight: ${theme.fonts.bold};
    text-transform: uppercase;
    padding-left: 0;
    cursor: pointer;

    &:active {
      color: ${theme.palette.light};
    }

    &:focus {
      outline: none;
    }

    &::-moz-focus-inner {
      border: 0;
    }
  }

  @media (min-width: 600px) {
    .title {
      margin: 1rem 2rem;
      margin-bottom: 0;
    }

    .innerWrapper {
      flex-direction: row;
    }

    ul.pricing {
      text-align: right;
      padding: 1rem 1rem 1rem 0;
      width: 50%;
    }

    .info {
      width: 50%;
      padding: 1rem 0 1rem 1rem;
    }

    .numberSelect {
      margin-top: 7px;
      width: auto;
    }
  }
`;
