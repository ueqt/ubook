import BookModel from "../../model/Book";
import { RouteComponentProps } from "../../router/withRouter";

export interface ViewerProps extends RouteComponentProps {
  book: BookModel;
  currentBook: BookModel;
  isReading: boolean;
  handleReadingState: (isReading: boolean) => void;
  handleReadingBook: (book: BookModel) => void;
  t: (title: string) => string;
}
export interface ViewerState {}
