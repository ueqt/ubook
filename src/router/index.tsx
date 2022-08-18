import React, { useEffect } from 'react';
import { Route, Routes, HashRouter } from "react-router-dom";
import Manager from "../pages/manager";
import HtmlReader from "../pages/htmlReader";
import DjvuReader from "../pages/djvuReader";
import PDFReader from "../pages/pdfReader";
import _Redirect from "../pages/redirect";
import i18n from "../i18n";
import StorageUtil from "../utils/serviceUtils/storageUtil";

const Router = () => {
  useEffect(() => {
    const lng = StorageUtil.getReaderConfig("lang");
    if (lng) {
      i18n.changeLanguage(lng);
    } else {
      if (navigator.language === "zh-CN") {
        i18n.changeLanguage("zh");
      } else {
        i18n.changeLanguage("en");
      }
    }
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/manager" element={<Manager />} />
        <Route path="/djvu" element={<DjvuReader />} />
        <Route path="/epub" element={<HtmlReader />} />
        <Route path="/mobi" element={<HtmlReader />} />
        <Route path="/cbr" element={<HtmlReader />} />
        <Route path="/cbt" element={<HtmlReader />} />
        <Route path="/cbz" element={<HtmlReader />} />
        <Route path="/azw3" element={<HtmlReader />} />
        <Route path="/txt" element={<HtmlReader />} />
        <Route path="/docx" element={<HtmlReader />} />
        <Route path="/md" element={<HtmlReader />} />
        <Route path="/rtf" element={<HtmlReader />} />
        <Route path="/fb2" element={<HtmlReader />} />
        <Route path="/html" element={<HtmlReader />} />
        <Route path="/htm" element={<HtmlReader />} />
        <Route path="/xml" element={<HtmlReader />} />
        <Route path="/xhtml" element={<HtmlReader />} />
        <Route path="/href" element={<HtmlReader />} />
        <Route path="/pdf" element={<PDFReader />} />
        <Route path="/" element={<_Redirect />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
