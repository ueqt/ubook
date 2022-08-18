import { RouteComponentProps } from "../../router/withRouter";

export interface RedirectProps extends RouteComponentProps {
  handleLoadingDialog: (isShowLoading: boolean) => void;
  t: (title: string) => string;
}

export interface RedirectState {
  isAuthed: boolean;
  isError: boolean;
  isCopied: boolean;
  token: string;
}
