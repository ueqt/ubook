import React from "react";
import "./booklist.css";
import BookCardItem from "../../../components/bookCardItem";
import BookListItem from "../../../components/bookListItem";
import BookCoverItem from "../../../components/bookCoverItem";
import AddFavorite from "../../../utils/readUtils/addFavorite";
import ShelfUtil from "../../../utils/readUtils/shelfUtil";
import SortUtil from "../../../utils/readUtils/sortUtil";
import BookModel from "../../../model/Book";
import { BookListProps, BookListState } from "./interface";
import StorageUtil from "../../../utils/serviceUtils/storageUtil";
import localforage from "localforage";
import Empty from "../../emptyPage";
import { Navigate } from "react-router-dom";
import ViewMode from "../../../components/viewMode";
import { backup } from "../../../utils/syncUtils/backupUtil";
import { isElectron } from "react-device-detect";
import SelectBook from "../../../components/selectBook";
import ShelfSelector from "../../../components/shelfSelector";
import withRouter from "../../../router/withRouter";
class BookList extends React.Component<BookListProps, BookListState> {
  constructor(props: BookListProps) {
    super(props);
    if(!ShelfUtil.oreillyBooks) {
      ShelfUtil.loadOreillyBooks();
    }
    this.state = {
      favoriteBooks: Object.keys(AddFavorite.getAllFavorite()).length,
      total: 0,
      languageIndex: 0,
      pageIndex: 0,
      pageCount: Math.floor(Object.values(ShelfUtil.oreillyBooks.datas).length / 300) + 1,
    };
  }
  UNSAFE_componentWillMount() {
    if (this.props.mode === "trash") {
      this.props.handleFetchBooks(true);
    } else {
      this.props.handleFetchBooks(false);
    }
  }
  componentDidMount() {
    if (!this.props.books || !this.props.books[0]) {
      return <Navigate to="manager/empty" />;
    }
  }

  handleKeyFilter = (items: any[], arr: string[]) => {
    let itemArr: any[] = [];
    arr.forEach((item) => {
      items.forEach((subItem: any) => {
        if (subItem.key === item) {
          itemArr.push(subItem);
        }
      });
    });
    return itemArr;
  };

  //获取书架数据
  handleShelf(items: any, index: number) {
    //获取书架名
    if (index < 1) return items;
    let shelfTitle = Object.keys(ShelfUtil.getShelf());
    //获取当前书架名
    let currentShelfTitle = shelfTitle[index];
    if (!currentShelfTitle) return items;
    //获取当前书架的图书列表
    if(currentShelfTitle === 'Oreilly') {
      // combine oreilly books
      let datas = Object.values(ShelfUtil.oreillyBooks.datas).map(c => c as BookModel);
      // datas = this.handleIndexFilter(
      //   datas,
      //   //返回排序后的图书index
      //   SortUtil.sortBooks(datas, this.props.bookSortCode) || []
      // );
      let pageCount = this.state.pageCount;
      let pageIndex = this.state.pageIndex;
      let total = this.state.total;
      if(this.state.languageIndex > 0) {
        datas = datas.filter(d => d.language === ShelfUtil.oreillyBooks.keys["language"][this.state.languageIndex - 1]);
      }
      if(total !== datas.length) {
        this.setState({ total: datas.length });
      }
      if(pageCount !== Math.floor(datas.length / 300) + 1) {
        pageCount = Math.floor(datas.length / 300) + 1;
        this.setState({ pageCount: pageCount});
        if(pageIndex >= pageCount) {
          pageIndex = 0;
          this.setState({ pageIndex: 0 });
        }
      }
      if(this.props.bookSortCode.order === 1) {
        datas.sort((a, b) => a.issued > b.issued ? 1 : -1);
      } else {
        datas.sort((b, a) => a.issued > b.issued ? 1 : -1);
      }
      return datas.slice(pageIndex * 300, pageIndex * 300 + (pageCount <= pageIndex + 1 ? (datas.length % 300) : 300));
    }
    let currentShelfList = ShelfUtil.getShelf()[currentShelfTitle];
    //根据图书列表获取到图书数据
    let shelfItems = items.filter((item: { key: number }) => {
      return currentShelfList.indexOf(item.key) > -1;
    });
    return shelfItems;
  }

  onValueChange = (event: any) => {
    const page = event.target.value;
    if(page > this.state.pageCount) {
      this.setState({ pageIndex: this.state.pageCount - 1 });
    } else {
      this.setState({ pageIndex: page - 1 });
    }
    this.renderBookList();
  }

  //根据搜索图书index获取到搜索出的图书
  handleIndexFilter = (items: any, arr: number[]) => {
    let itemArr: any[] = [];
    arr.forEach((item) => {
      items[item] && itemArr.push(items[item]);
    });
    return itemArr;
  };
  renderBookList = () => {
    //根据不同的场景获取不同的图书数据

    let books: BookModel[] = [];
    if(+this.props.shelfIndex === 1) {
      books = this.handleShelf(this.props.books, this.props.shelfIndex);
      // books = this.handleIndexFilter(books, SortUtil.sortBooks(books, this.props.bookSortCode) || []);
    } else {
      books = this.props.isSearch //搜索图书
        ? this.handleIndexFilter(this.props.books, this.props.searchResults)
        : this.props.shelfIndex > 0 //展示书架
        ? this.handleIndexFilter(
            this.handleShelf(this.props.books, this.props.shelfIndex),
            //返回排序后的图书index
            SortUtil.sortBooks(this.props.books, this.props.bookSortCode) || []
          )
        : this.props.mode === "favorite"
        ? this.handleIndexFilter(
            this.handleKeyFilter(this.props.books, AddFavorite.getAllFavorite()),
            //返回排序后的图书index
            SortUtil.sortBooks(this.props.books, this.props.bookSortCode) || []
          )
        : this.handleIndexFilter(
            this.props.books,
            //返回排序后的图书index
            SortUtil.sortBooks(this.props.books, this.props.bookSortCode) || []
          );
    }

    if (this.props.mode === "shelf" && books.length === 0) {
      return (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <Empty />
        </div>
      );
    }
    return books.map((item: BookModel, index: number) => {
      return this.props.viewMode === "list" ? (
        <BookListItem
          {...{
            key: index,
            book: item,
            isSelected: this.props.selectedBooks.indexOf(item.key) > -1,
          }}
        />
      ) : this.props.viewMode === "card" ? (
        <BookCardItem
          {...{
            key: index,
            book: item,
            isSelected: this.props.selectedBooks.indexOf(item.key) > -1,
          }}
        />
      ) : (
        <BookCoverItem
          {...{
            key: index,
            book: item,
            isSelected: this.props.selectedBooks.indexOf(item.key) > -1,
          }}
        />
      );
    });
  };

  handleLanguage = (event: any) => {
    let index = event.target.value.split(",")[1];
    this.setState({ languageIndex: index });
    // this.props.handleShelfIndex(index);
  };

  renderLanguageList = () => {
    let languageList = ShelfUtil.oreillyBooks.keys["language"];
    languageList = ['all',...languageList];
    return languageList.map((item, index) => {
      return (
        <option
          value={[item, index.toString()]}
          key={index}
          className="language-list-option"
          selected={this.state.languageIndex === index ? true : false}
        >
          {this.props.t(item)}
        </option>
      );
    });
  };

  renderPage = () => {
    if(+this.props.shelfIndex === 1) {
      return (
        <div className="book-list-page">
          <input type="text" 
            defaultValue={ this.state.pageIndex + 1 }                       
            onBlur={(event) => {
              this.onValueChange(event);
          }} /> / { this.state.pageCount } ( { this.state.total } )
        </div>
      );
    } else {
      return (<span></span>);
    }
  }

  render() {
    if (
      (this.state.favoriteBooks === 0 && this.props.mode === "favorite") ||
      !this.props.books ||
      !this.props.books[0]
    ) {
      return <Navigate to="/manager/empty" />;
    }
    if (isElectron) {
      //兼容之前的版本
      localforage.getItem(this.props.books[0].key).then((result) => {
        if (result) {
          backup(
            this.props.books,
            this.props.notes,
            this.props.bookmarks,
            false
          );
        }
      });
    }

    StorageUtil.setReaderConfig(
      "totalBooks",
      this.props.books.length.toString()
    );
    return (
      <>
        <ViewMode />
        <SelectBook />
        { this.renderPage() }
          <div
            className="language-shelf-container"
            style={this.props.isCollapsed ? {} : { left: "calc(50% + 220px)" }}
          >
          <select
              className="language-shelf-list"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                this.handleLanguage(event);
              }}
            >
            {this.renderLanguageList()}
          </select>
        </div>
        {!this.props.isSelectBook && <ShelfSelector />}
        <div
          className="book-list-container-parent"
          style={
            this.props.isCollapsed
              ? { width: "calc(100vw - 70px)", left: "70px" }
              : {}
          }
        >
          <div className="book-list-container">
            <ul className="book-list-item-box">{this.renderBookList()}</ul>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(BookList);
