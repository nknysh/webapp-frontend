import React, { FormEvent, EventHandler, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Lodging } from 'services/BackendApi';
import { Frame } from 'pureUi/Frame';
import { TabBarCompact } from '../TabBar/index';
import { Tab } from 'pureUi/Buttons';
import Stepper from 'pureUi/Stepper';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export interface LodgingsEditorProps extends HTMLAttributes<HTMLDivElement> {
  lodgings: Lodging[];
  activeLodgingIndex: number;
  totalGuestCount: number;
  showControls: boolean;
  onIncrementIndex: (step: number) => void;
  onTabSelect: (tabIndex: number) => void;
  onIncrementRoomCount: (value: number) => void;
  onIncrementAdultCount: (lodgingIndex: number, value: number) => void;
  onIncrementChildCount: (lodgingIndex: number, value: number) => void;
  onChildAgeChange: (lodgingIndex: number, childIndex: number, value: string) => void;
}

export const LodgingsEditorComponent = (props: LodgingsEditorProps) => {
  const { 
    className,
    lodgings, 
    activeLodgingIndex,
    totalGuestCount,
    showControls,
    onIncrementIndex,
    onTabSelect,
    onIncrementRoomCount,
    onIncrementAdultCount,
    onIncrementChildCount,
    onChildAgeChange,
    ...buttonProps
  } = props;

  const handleTabSelect = (tabIndex: number) => () => {
    props.onTabSelect(tabIndex);
  };

  const handleIncrementRoom = (step: number) => (e: FormEvent<HTMLButtonElement>) => {
    props.onIncrementRoomCount(step);
  };

  const handleIncrementAdult = (step: number) => (e: FormEvent<HTMLButtonElement>) => {
    props.onIncrementAdultCount(props.activeLodgingIndex, step);
  };

  const handleIncrementChild = (step: number) => (e: FormEvent<HTMLButtonElement>) => {
    props.onIncrementChildCount(props.activeLodgingIndex, step);
  };
  
  const handleAgeChange = (ageIndex: number) => (e: FormEvent<HTMLSelectElement>) => {
    props.onChildAgeChange(props.activeLodgingIndex, ageIndex, e.currentTarget.value);
  };

  const activeLodging = props.lodgings[props.activeLodgingIndex];

  return (
    <div className={className}>
      <div tabIndex={0} className="pseudoSelect" {...buttonProps}>
        {`${props.lodgings.length} Rooms, ${props.totalGuestCount} Guests`}
        { showControls && (
        <Frame className="controls">
          <ul>
            <li className="stepItem rooms">
              Room <Stepper onIncrement={handleIncrementRoom} value={activeLodging.numberOfAdults} max={99} />
            </li>

            <li className="roomTabs">
              {props.lodgings.length > 1 && <TabBarCompact tabIndex={props.activeLodgingIndex} onIncrementTabIndex={props.onIncrementIndex}>
                {props.lodgings.map((_, i) => {
                  return <Tab key={i} onClick={handleTabSelect(i)}>{`Room ${i + 1}`}</Tab>;
                })}
              </TabBarCompact>
              }
            </li>
            <li className="stepItem">  
                Adults <Stepper onIncrement={handleIncrementAdult} value={activeLodging.numberOfAdults} max={99} />
            </li>

            <li className="stepItem">
              Children <Stepper onIncrement={handleIncrementChild} value={activeLodging.numberOfAdults} max={99} />
            </li>

            <li className="childAges">
            { activeLodging.agesOfAllChildren?.map((childAge, childIndex) => {
              return (
                <select key={childIndex} value={childAge} onChange={handleAgeChange(childIndex)}>
                  {Array.from({length: 16}).map((_, ageIndex) => (
                    <option key={`age-option-${childIndex}-${ageIndex}`} value={ageIndex + 1}>{ageIndex + 1}</option>
                  ))}
                </select>
              );
            })}
            </li>
          </ul>
        </Frame>
      )}
      </div>
    </div>
  );
};

export const LodgingsEditor = styled(LodgingsEditorComponent)`
  position: relative;

  .pseudoSelect {
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    position: relative;
    text-transform: uppercase;
    padding: 10px;
    font-size: 14px;
    color: ${pureUiTheme.colors.black};
    text-align: left;
    width: 100%;
  }

  p {
    margin: 0;
  }
  
  .controls {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .stepItem {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }

  .stepItem.rooms {
    border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  }
`