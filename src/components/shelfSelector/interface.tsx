import BookModel from "../../model/Book";
import NoteModel from "../../model/Note";
import BookmarkModel from "../../model/Bookmark";
import { RouteComponentProps } from "../../router/withRouter";

export interface ShelfChooserProps extends RouteComponentProps {
  books: BookModel[];
  mode: string;
  shelfIndex: number;
  isCollapsed: boolean;
  viewMode: string;
  selectedBooks: string[];
  bookmarks: BookmarkModel[];
  notes: NoteModel[];
  handleFetchList: () => void;
  handleMode: (mode: string) => void;
  handleShelfIndex: (index: number) => void;
  handleDeleteDialog: (isShow: boolean) => void;
  handleFetchBooks: (isTrash: boolean) => void;
  t: (title: string) => string;
}
export interface ShelfChooserState {
  shelfIndex: number;
  isOpenDelete: boolean;
}
