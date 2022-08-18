import BookModel from "../../../model/Book";
import { RouteComponentProps } from "../../../router/withRouter";

export interface BookListProps extends RouteComponentProps {
  books: BookModel[];
  deletedBooks: BookModel[];
  mode: string;
  selectedBooks: string[];
  isBookSort: boolean;
  isCollapsed: boolean;
  viewMode: string;
  bookSortCode: { sort: number; order: number };
  noteSortCode: { sort: number; order: number };
  handleFetchList: () => void;
  handleMode: (mode: string) => void;
  handleDeleteDialog: (isShow: boolean) => void;
  handleFetchBooks: (isTrash: boolean) => void;
}
export interface BookListState {}
