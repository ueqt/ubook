import React from 'react';
import BookList from "../containers/lists/bookList";
import DeletedBookList from "../containers/lists/deletedBookList";
import NoteList from "../containers/lists/noteList";
import DigestList from "../containers/lists/digestList";
import EmptyPage from "../containers/emptyPage";
import LoadingPage from "../containers/loadingPage";

export const routes = [
  { path: "/manager/empty", element: <EmptyPage /> },
  { path: "/manager/loading", element: <LoadingPage /> },
  { path: "/manager/note", element: <NoteList /> },
  { path: "/manager/digest", element: <DigestList /> },
  { path: "/manager/home", element: <BookList /> },
  { path: "/manager/favorite", element: <BookList /> },
  { path: "/manager/trash", element: <DeletedBookList /> },
];
