import BookModel from "../../../model/Book";
import NoteModel from "../../../model/Note";
import BookmarkModel from "../../../model/Bookmark";
import { RouteComponentProps } from "../../../router/withRouter";

export interface BookListProps extends RouteComponentProps {
  books: BookModel[];
  mode: string;
  shelfIndex: number;
  searchResults: number[];
  isSearch: boolean;
  isCollapsed: boolean;
  isBookSort: boolean;
  isSelectBook: boolean;
  viewMode: string;
  selectedBooks: string[];
  bookmarks: BookmarkModel[];
  notes: NoteModel[];
  bookSortCode: { sort: number; order: number };
  noteSortCode: { sort: number; order: number };
  handleFetchList: () => void;
  handleAddDialog: (isShow: boolean) => void;
  handleMode: (mode: string) => void;
  handleFetchBooks: (isTrash: boolean) => void;

  t: (title: string) => string;
}
export interface BookListState {
  favoriteBooks: number;
  total: number;
  languageIndex: number;
  pageIndex: number;
  pageCount: number;
}
