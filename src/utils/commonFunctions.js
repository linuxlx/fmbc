import pathToRegexp from 'path-to-regexp';

export const isType = (obj, type) => {
  if (type) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  } else {
    return Object.prototype.toString.call(obj).slice(' ')[1].split(']')[0];
  }
}

export const descriptionParse = (str, title) => {
  if (!str || !title) return []
  const newStr = str.replace(/\s+/g, '');
  const arr = newStr.split(`<${title}>`);
  const len = arr.length;
  const parseArr = [];
  for (let i = 0; i < len; i++) {
    if (arr[i]) {
      // 提取title节点文字
      const itemTexts = getText(removeStr(arr[i], '</title>'));
      const item = {
        title: itemTexts[0],
        children: [],
      }
      // 删掉title节点，避免将title节点错误的push到children数组里
      itemTexts.shift();
      for (let j = 0; j < itemTexts.length; j += 2) {
        const tagTexts = itemTexts[j].split('>');
        item.children.push({
          tag: tagTexts[0],
          text: tagTexts[1],
        })
      }
      parseArr.push(item);
    }
  }
  return parseArr;
}

const removeStr = (str, regStr) => {
  const reg = new RegExp(regStr, 'g');
  return str.replace(reg, '');
}

const getText = (str) => {
  return str.split('<');
}

export const findPathNameInRoutes = (routes, pathname) => {
  const len = routes.length;
  for (let i = 0; i < len; i += 1) {
    const path = routes[i].path;
    if (path) {
      const pathReg = pathToRegexp(path);
      if (pathReg.test(pathname)) {
        return routes[i];
      }
    }
  }
}

export const addStyle = (cssText) => {
  const style = document.createElement('style');
  const head = document.getElementsByTagName('head')[0];
  const textNode = document.createTextNode(cssText);
  style.type = 'text/css';
  style.appendChild(textNode);
  head.appendChild(style);
}

export const serializeArray = (name, valueArr) => {
  const newName = `${name}=`;
  const res = [];
  for (let i = 0; i < valueArr.length; i++) {
    if (valueArr[i] !== '') {
      res.push(newName + encodeURIComponent(valueArr[i]));
    }
  }
  return res.join('&');
};

export const serializeQuery = (param) => {
  const p = [];
  Object.keys(param).forEach((k) => {
    const v = param[k];
    if (v !== '') {
      p.push(v instanceof Array ? serializeArray(k, v) : `${k}=${encodeURIComponent(v)}`);
    }
  })
  return p.join('&');
};

export function pathToRegexpGlobal(regStr) {
  const newRegStr = regStr.replace(/\/\//g, '/');
  const re = pathToRegexp(newRegStr);
  let reS = re.toString();
  reS = reS.replace(/\/\^/, '');
  reS = reS.replace(/\$\/i/, '');
  return new RegExp(reS, 'gi');
}
