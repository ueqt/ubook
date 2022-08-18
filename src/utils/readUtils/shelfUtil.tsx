const defaultShelf = {
  New: null,
  Oreilly: [],
  Study: [],
  Work: [],
  Entertainment: [],
};
class ShelfUtil {
  static setShelf(shelfTitle: string, bookKey: string) {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json!) || defaultShelf;
    if (obj[shelfTitle] === undefined) {
      obj[shelfTitle] = [];
    }
    if (obj[shelfTitle].indexOf(bookKey) === -1) {
      obj[shelfTitle].unshift(bookKey);
    }
    localStorage.setItem("shelfList", JSON.stringify(obj));
  }

  static getShelf() {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json!) || defaultShelf;
    return obj;
  }
  static clearShelf(shelfIndex: number, bookKey: string) {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json!) || defaultShelf;
    let shelfTitle = Object.keys(obj);
    let currentShelfTitle = shelfTitle[shelfIndex];
    let index = obj[currentShelfTitle].indexOf(bookKey);
    obj[currentShelfTitle].splice(index, 1);
    localStorage.setItem("shelfList", JSON.stringify(obj));
  }
  static deletefromAllShelf(bookKey: string) {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json!) || defaultShelf;
    let shelfTitle = Object.keys(obj);
    shelfTitle.splice(0, 1);
    shelfTitle.forEach((item) => {
      let index = obj[item].indexOf(bookKey);
      if (index > -1) {
        obj[item].splice(index, 1);
      }
    });
    localStorage.setItem("shelfList", JSON.stringify(obj));
  }
  static removeShelf(shelfTitle: string) {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json!) || defaultShelf;
    delete obj[shelfTitle];
    localStorage.setItem("shelfList", JSON.stringify(obj));
  }
  static getBookPosition(bookKey: string) {
    let json = localStorage.getItem("shelfList");
    let obj = JSON.parse(json!) || defaultShelf;
    let shelfList: string[] = [];
    for (let item in obj) {
      if (obj[item] && obj[item].indexOf(bookKey) > -1) {
        shelfList.push(item);
      }
    }
    return shelfList;
  }
  static loadOreillyBooks() {
    const fs = window.require("fs");
    const path = window.require("path");
    let storageLocation = localStorage.getItem("storageLocation")
      ? localStorage.getItem("storageLocation")
      : window
        .require("electron")
        .ipcRenderer.sendSync("storage-location", "ping");
    ShelfUtil.oreillyBooks = JSON.parse(fs.readFileSync(path.join(storageLocation, 'oreilly', 'all.json'), { encoding: 'utf-8' }));
    Object.values(ShelfUtil.oreillyBooks.datas).forEach((element: any) => {
      element["key"] = element["archive_id"];
      element["name"] = element["title"];
      element["path"] = ShelfUtil.getOreillyBookEpub(element);
      element["cover"] = element["cover_url"];
      element["format"] = "EPUB";
      element["description"] = element["key"];
      element["author"] = element["authors"] ? element["authors"].join("<br/>") : "";
      element["publisher"] = element["publishers"] ? element["publishers"].join("<br/>") : "";
      delete element["archive_id"];
      delete element["title"];
      delete element["cover_url"];
    });
    return ShelfUtil.oreillyBooks;
  }
  static getOreillyBookEpub(element) {
    const path = window.require("path");
    let oreillyLocation = localStorage.getItem("oreillyLocation")
      ? localStorage.getItem("oreillyLocation")
      : window
        .require("electron")
        .ipcRenderer.sendSync("oreilly-location", "ping");
    return path.join(oreillyLocation, element["key"] + ".epub");
  }
  static oreillyBooks: {
    datas: {},
    keys: {}
  };
}

export default ShelfUtil;
