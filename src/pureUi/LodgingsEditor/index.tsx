import React from 'react';
import { Lodging } from 'services/BackendApi';

export interface LodgingsEditorProps {
  lodgings: Lodging[];
  activeLodgingIndex: number;
  onTabSelect: (tabIndex: number) => void;
  onIncrementRoomCount: (value: number) => void;
  onIncrementAdultCount: (lodgingIndex: number, value: number) => void;
  onIncrementChildCount: (lodgingIndex: number, value: number) => void;
  onChildAgeChange: (lodgingIndex: number, childIndex: number, value: string) => void;
}

export const LodgingsEditor = (props: LodgingsEditorProps) => {
  const handleTabSelect = (tabIndex: number) => () => {
    props.onTabSelect(tabIndex);
  };

  const handleIncrementRoom = (increment: number) => () => {
    props.onIncrementRoomCount(increment);
  };

  const handleIncrementAdult = (increment: number) => () => {
    props.onIncrementAdultCount(props.activeLodgingIndex, increment);
  };

  const handleIncrementChild = (increment: number) => () => {
    props.onIncrementChildCount(props.activeLodgingIndex, increment);
  };
  
  const handleAgeChange = (ageIndex: number) => (e: React.FormEvent<HTMLSelectElement>) => {
    props.onChildAgeChange(props.activeLodgingIndex, ageIndex, e.currentTarget.value);
  };

  const activeLodging = props.lodgings[props.activeLodgingIndex];
  console.log(activeLodging);

  return (
    <div>
      <div>
        {props.lodgings.map((_, i) => {
          return <button key={i} onClick={handleTabSelect(i)}>{`Room ${i + 1}`}</button>;
        })}
      </div>

      <div>
        <label>
          Rooms <button onClick={handleIncrementRoom(-1)}>-</button> {props.lodgings.length}{' '}
          <button onClick={handleIncrementRoom(1)}>+</button>
        </label>
      </div>

      <div>
        <label>
          Adults <button onClick={handleIncrementAdult(-1)}>-</button> {activeLodging.numberOfAdults}{' '}
          <button onClick={handleIncrementAdult(1)}>+</button>
        </label>

        <label>
          Children <button onClick={handleIncrementChild(-1)}>-</button> {activeLodging.agesOfAllChildren?.length}{' '}
          <button onClick={handleIncrementChild(1)}>+</button>
        </label>

        <div>
        { activeLodging.agesOfAllChildren?.map((childAge, childIndex) => {
          return (
            <select key={childIndex} value={childAge} onChange={handleAgeChange(childIndex)}>
              {Array.from({length: 16}).map((_, ageIndex) => (
                <option key={`age-option-${childIndex}-${ageIndex}`} value={ageIndex + 1}>{ageIndex + 1}</option>
              ))}
            </select>
          );
        })}
        </div>
      </div>
    </div>
  );
};
