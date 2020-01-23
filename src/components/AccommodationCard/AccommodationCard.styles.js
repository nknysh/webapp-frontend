import styled from 'styled-components';
import AccommodationCard from './AccommodationCard.jsx';
import { theme } from 'styles';
import { colors } from '../../pureUi/pureUiTheme';

export default styled(AccommodationCard)`
  position: relative;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.backgrounds.secondary};
  color: ${theme.palette.light};
  line-height: 20px;
  margin-bottom: 1rem;

  hr {
    width: 90%;
    border-top: 1px solid ${colors.grayDark};
  }

  .canHold {
    background: white;
    margin-top: 1rem;
    margin-left: 2rem;
    padding: 0.5rem;
    text-transform: uppercase;
    color: ${theme.palette.primary};
    width: fit-content;
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

      li {
        font-size: 12px;
      }

      .price {
        font-size: 20px;
        color: ${theme.colors['red-fade']};
        margin-top: 10px;
        margin-bottom: 6px;
      }

      .priceBeforeDiscount {
        font-size: 19.2px;
        text-decoration: line-through;
        margin-bottom: 14px;
      }

      .add-lodging-button-wrapper {
        position: absolute;
        bottom: 28px;
        right: 28px;
      }

      .addLodgingButton {
        float: right;
        width: 129px;
      }
    }

    .info {
      width: 50%;
      padding: 0 0 1rem 1rem;
    }

    .numberSelect {
      margin-top: 7px;
      width: auto;
    }
  }
`;
