import { RouteComponentProps } from "../../router/withRouter";

export interface SidebarProps extends RouteComponentProps {
  mode: string;
  isCollapsed: boolean;
  handleMode: (mode: string) => void;
  handleSearch: (isSearch: boolean) => void;
  handleCollapse: (isCollapsed: boolean) => void;
  handleSortDisplay: (isSortDisplay: boolean) => void;
  handleSelectBook: (isSelectBook: boolean) => void;
  handleShelfIndex: (shelfIndex: number) => void;
  t: (title: string) => string;
}

export interface SidebarState {
  index: number;
  hoverIndex: number;
  isCollapsed: boolean;
}
