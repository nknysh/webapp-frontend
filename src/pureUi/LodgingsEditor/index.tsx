import React, { memo, FormEvent, useEffect, useRef, HTMLAttributes, useCallback } from 'react';
import styled from 'styled-components';
import { Lodging } from 'services/BackendApi';
import { Frame } from 'pureUi/Frame';
import { TabBarCompact } from '../TabBar/index';
import { Tab } from 'pureUi/Buttons';
import Stepper from 'pureUi/Stepper';
import { pureUiTheme } from 'pureUi/pureUiTheme';

export interface LodgingsEditorProps extends HTMLAttributes<HTMLButtonElement> {
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
  onClickOutside: (e: MouseEvent) => void;
}

export const LodgingsEditorComponent = memo((props: LodgingsEditorProps) => {
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
    onClickOutside,
    ...buttonProps
  } = props;

  const wrapper = useRef<HTMLDivElement>(null);

  const handleTabSelect = (tabIndex: number) => () => {
    props.onTabSelect(tabIndex);
  };

  const handleIncrementRoom = (step: number) => {
    props.onIncrementRoomCount(step);
  };

  const handleIncrementAdult = (step: number) => {
    props.onIncrementAdultCount(props.activeLodgingIndex, step);
  };

  const handleIncrementChild = (step: number) => {
    props.onIncrementChildCount(props.activeLodgingIndex, step);
  };
  
  const handleAgeChange = (ageIndex: number) => (e: FormEvent<HTMLSelectElement>) => {
    props.onChildAgeChange(props.activeLodgingIndex, ageIndex, e.currentTarget.value);
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const isInside = wrapper.current!.contains(e.target as Node);
      if (!isInside) {
        props.onClickOutside(e);
      }
    },
    [props.onClickOutside]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const activeLodging = props.lodgings[props.activeLodgingIndex];

  return (
    <div ref={wrapper} className={className}>
      <button tabIndex={0} className="pseudoSelect" {...buttonProps}>{`${props.lodgings.length} Rooms, ${props.totalGuestCount} Guests`}</button>
      { showControls && (
        <Frame className="controls">
          <ul>
            <li className="stepItem rooms">
              Room <Stepper onIncrement={handleIncrementRoom} value={lodgings.length} max={99} />
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
              Children <Stepper onIncrement={handleIncrementChild} value={activeLodging.agesOfAllChildren!.length} min={0} max={99} />
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
  );
});

export const LodgingsEditor = styled(LodgingsEditorComponent)`
  position: relative;

  .pseudoSelect {
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    position: relative;
    text-transform: uppercase;
    padding: 10px;
    font-family: 'HurmeGeometricSans2';
    font-size: 14px;
    color: ${pureUiTheme.colors.black};
    text-align: left;
    width: 100%;
    color: ${pureUiTheme.colors.black};

    transition: all 0.15s ease-out;
    box-shadow: 0 0 0 2px transparent;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
    }
  }

  p {
    margin: 0;
  }
  
  .controls {
    min-width: 340px;
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