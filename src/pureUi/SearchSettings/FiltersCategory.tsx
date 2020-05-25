import React, { Fragment } from "react";
import { IFiltersCategory, IFilterOption } from "services/BackendApi/types/SearchOptionsResponse"
import { List } from "../List";
import { Filters } from "../../services/BackendApi/types";
import Checkbox from "../Checkbox";


export interface FiltersCategoryProps extends React.HTMLProps<HTMLDivElement> {
  filtersCategory: IFiltersCategory;
  handleFilterChange: Function;
  selectedFilters: Filters[];
}
export const FiltersCategory = (props: FiltersCategoryProps) => {
  return (
    <Fragment>
      <h5>{props.filtersCategory.categoryTitle}</h5>
      <List
        items={props.filtersCategory.filters}
        render={(filter: IFilterOption) => {
          const isSelected = Boolean(props.selectedFilters.includes(filter.filterEnumName));
          return (
            <li key={filter.filterEnumName}>
              <label>
                {' '}
                <Checkbox checked={isSelected} onChange={props.handleFilterChange(filter.filterEnumName)}/> {filter.filterTitle}
              </label>
            </li>
          );
        }}
      />
    </Fragment>
  )
};
