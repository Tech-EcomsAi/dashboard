// This file will export the basic utitlity function to use globally.
import cookie from "cookie";
import { windowRef } from './window';

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
export function getMobileOperatingSystem() {
  var userAgent = windowRef()?.navigator?.userAgent || windowRef()?.navigator?.vendor || windowRef()?.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !windowRef().MSStream) {
    return "IOS";
  }

  return "unknown";
}

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export function timeDiffCalc(dateFuture, dateNow, status) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;
  // console.log('calculated days', days);

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;
  // console.log('calculated hours', hours);

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;
  // console.log('minutes', minutes);

  let difference: any = '';
  switch (status) {
    case 'Days':
      difference = days;
      break;
    case 'Hours':
      difference = hours;
      break;
    case 'Minutes':
      difference = minutes;
      break;
    case 'Fulldate':
      if (days > 0) {
        difference += (days === 1) ? `${days} day, ` : `${days} days, `;
      }

      difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

      difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;
      break;
  }

  return difference;
}

/**
 * This utility function will truncate the long text
 * with the chars provided, for example if chars = 32 then it will
 * truancate the text till 32th character and return the new text.
 * @param {*} desc 
 * @param {*} chars 
 */
export const TruncateText = (desc, chars) => {
  if (desc && desc?.length > chars) {
    return desc.substring(0, chars) + '';
  } else {
    return desc
  }
}

export function parseJSON(response) {
  return new Promise(resolve => {
    response.text().then(body => {
      resolve({
        status: response.status,
        ok: response.ok,
        json: body !== '' ? JSON.parse(body) : '{}'
      })
    })
  })
}

function formatFilterString(type, filter) {
  const filterStringArray = Object.keys(filter)?.map(key => {
    const value = filter[key]
    let queryString: any = `${key},${value}`

    if (typeof value === 'object')
      queryString = Object.keys(value)?.map(
        attr => `${key}.${attr},${value[attr]}`
      )

    return `${type}(${queryString})`
  })

  return filterStringArray.join(':')
}

function formatQueryString(key, value) {
  if (key === 'limit' || key === 'offset') {
    return `page${value}`
  }

  if (key === 'filter') {
    const filterValues = Object.keys(value)?.map(filter =>
      formatFilterString(filter, value[filter])
    )

    return `${key}=${filterValues.join(':')}`
  }

  return `${key}=${value}`
}

function buildQueryParams({ includes, sort, limit, offset, filter }) {
  const query: any = {}

  if (includes) {
    query.include = includes
  }

  if (sort) {
    query.sort = `${sort}`
  }

  if (limit) {
    query.limit = `[limit]=${limit}`
  }

  if (offset) {
    query.offset = `[offset]=${offset}`
  }

  if (filter) {
    query.filter = filter
  }

  return Object.keys(query)
    ?.map(k => formatQueryString(k, query[k]))
    .join('&')
}

export function buildURL(endpoint, params) {
  if (
    params.includes ||
    params.sort ||
    params.limit ||
    params.offset ||
    params.filter
  ) {
    const paramsString = buildQueryParams(params)

    return `${endpoint}?${paramsString}`
  }

  return endpoint
}

export function buildRequestBody(body) {
  let parsedBody
  if (body) {
    if (body.options) {
      parsedBody = `{
        "data": ${JSON.stringify(body.data)},
        "options" : ${JSON.stringify(body.options)}
      }`
    } else {
      parsedBody = `{
        "data": ${JSON.stringify(body)}
      }`
    }
  }

  return parsedBody
}

export function buildCartItemData(
  id,
  quantity = null,
  type = 'cart_item',
  flows,
  isSku = false
) {
  const payload = {
    type,
    ...flows
  }

  if (type === 'cart_item') {
    if (isSku)
      Object.assign(payload, {
        sku: id,
        quantity: parseInt(quantity, 10)
      })
    else
      Object.assign(payload, {
        id,
        quantity: parseInt(quantity, 10)
      })
  }

  if (type === 'promotion_item') {
    Object.assign(payload, {
      code: id
    })
  }

  return payload
}

export function buildCartCheckoutData(
  customer,
  billing_address,
  shipping_address
) {
  let parsedCustomer = customer

  if (typeof customer === 'string') parsedCustomer = { id: customer }

  return {
    customer: parsedCustomer,
    billing_address,
    shipping_address
  }
}

export function resetProps(instance) {
  const inst = instance
    ;['includes', 'sort', 'limit', 'offset', 'filter'].forEach(
      e => delete inst[e]
    )
}

export function getCredentials(storage) {
  return JSON.parse(storage.get('moltinCredentials'))
}

export function tokenInvalid(config) {
  const credentials = getCredentials(config.storage)

  return (
    !credentials ||
    !credentials.access_token ||
    credentials.client_id !== config.client_id ||
    Math.floor(Date.now() / 1000) >= credentials.expires
  )
}

export function formatTimeTo12Hr(time) {
  if (time) {
    let timeNewDateString = time.split(":");
    let timeNewDate = new Date();
    timeNewDate.setHours(parseInt(timeNewDateString[0]));
    timeNewDate.setMinutes(parseInt(timeNewDateString[1]));
    const hour24 = timeNewDate.getHours();
    let minutes = (timeNewDate.getMinutes() === 0) ? '00' : timeNewDate.getMinutes();
    minutes = (minutes > 0 && minutes < 10) ? `0${minutes}` : minutes;
    const ampm = (hour24 >= 12) ? 'PM' : 'AM';
    let hour: any = hour24 % 12 || 12;
    //append zero is hour is single digit
    if (hour < 10) {
      hour = `0${hour}`;
    }
    return `${hour}:${minutes} ${ampm}`;
  } else return '';
};
export function hex2rgb(colour, alpha) {
  var r, g, b;
  if (colour.charAt(0) == "#") {
    colour = colour.substr(1);
  }

  r = colour.charAt(0) + '' + colour.charAt(1);
  g = colour.charAt(2) + '' + colour.charAt(3);
  b = colour.charAt(4) + '' + colour.charAt(5);

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  return alpha ? `rgb(${r},${g},${b},${alpha}%)` : `rgb(${r},${g},${b})`;
}

export function dynamicSort(property: any, order: number) {
  var sortOrder = order;
  if (property == 'lastVisitedOn') {
    return function (a: any, b: any) {
      var result = (new Date(a[property]).getTime() < new Date(b[property]).getTime()) ? -1 : (new Date(a[property]).getTime() > new Date(b[property]).getTime()) ? 1 : 0;
      return result * sortOrder;
    }
  } else {
    return function (a: any, b: any) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
}

export function updateManifestFile(storeData: any) {
  const theme_color = document.getElementById("theme-color").getAttribute("content");
  const manifestConfig = storeData.configData.storeConfig.manifestConfig;
  const manifestString = JSON.stringify({
    ...{
      "name": `${storeData.tenant}, ${storeData.name}` || 'Respark',
      "short_name": `${storeData.tenant}` || 'Respark',
      "start_url": storeData.url || '/',
      "display": "standalone",
      "background_color": theme_color || "#dee1ec",
      "theme_color": theme_color || "#dee1ec",
      "orientation": "standalone",
      "description": storeData.description,
      "id": storeData.tenantId,
      "icons": [
        {
          "src": manifestConfig.icons['180'],
          "type": "image/png",
          "sizes": "180x180"
        },
        {
          "src": manifestConfig.icons['192'],
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": manifestConfig.icons['384'],
          "type": "image/png",
          "sizes": "384x384"
        },
        {
          "src": manifestConfig.icons['512'],
          "type": "image/png",
          "sizes": "512x512"
        },
        {
          "src": manifestConfig.icons['1024'],
          "type": "image/png",
          "sizes": "1024x1024"
        }
      ]
    },
  });
  // console.log(manifestString)
  const manifestElement = document.getElementById("manifest");
  manifestElement?.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(manifestString));
}

export function getDateObj(startDate: any = new Date()) {
  let dateObj = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const month = (dateObj.getMonth() + 1).toString().length == 1 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
  const date = dateObj.getDate().toString().length == 1 ? `0${dateObj.getDate()}` : dateObj.getDate();
  return {
    displayDate: date,
    displayDay: dateObj.toLocaleString('en-us', { weekday: 'long' }).substring(0, 3),
    newDate: dateObj,
    dateObj: `${dateObj.getFullYear()}-${month}-${date}`
  }
}

export function initialThemeHandler() {
  let isDark = false;
  if (localStorage.getItem("theme")) {
    isDark = localStorage.getItem("theme") == 'dark' ? true : false
  } else {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkTheme) {
      localStorage.setItem("theme", 'dark');
      isDark = true;
    } else {
      localStorage.setItem("theme", 'light');
      isDark = false;
    }
  }
  return isDark
}

export function convertRGBtoOBJ(colorString) {
  const rgbKeys = ['r', 'g', 'b', 'a'];
  let rgbObj = {};
  let color = colorString.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

  for (let i in rgbKeys)
    rgbObj[rgbKeys[i]] = color[i] || 1;

  return rgbObj;
}

export function convertOBJtoRgb(obj) {
  return `rgba(${obj.r}, ${obj.g}, ${obj.b}, ${obj.a})`;
}

export const uid = () => String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');

export const isContainerElement = (config) => config.section ? true : false;

export const removeObjRef = (obj) => JSON.parse(JSON.stringify(obj || {}));

export const getGradientValue = (colors, direction = 'to right') => {
  let colorsString = '';
  colors.map((c, i) => {
    colorsString = `${colorsString}${c.color}${i != colors.length - 1 ? ', ' : ''}`
  })
  return (`linear-gradient(${direction}, ${colorsString})`);
}

export function isSameObjects(value, other) {
  // Get the value type
  var type = Object.prototype.toString.call(value);
  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;
  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
  // Compare the length of the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;
  // Compare two items
  var compare = function (item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1);
    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isSameObjects(item1, item2)) return false;
    }
    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;
      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }
  // If nothing failed, return true
  return true;

};