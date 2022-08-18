import BookModel from "../../model/Book";
import { RouteComponentProps } from "../../router/withRouter";

export interface ViewerProps extends RouteComponentProps {
  book: BookModel;
  currentBook: BookModel;
  isReading: boolean;
  handleReadingState: (isReading: boolean) => void;
  handleReadingBook: (book: BookModel) => void;
  t: (title: string) => string;
  handleFetchBooks: () => void;
  handleFetchNotes: () => void;
  handleFetchBookmarks: () => void;
}
export interface ViewerState {
  href: string;
  title: string;
  cfiRange: any;
  contents: any;
  rect: any;
  loading: boolean;
  pageWidth: number;
  pageHeight: number;
}
