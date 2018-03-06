import config from './config';

const class2type = {};
const hasOwn = class2type.hasOwnProperty;
const toString = class2type.toString;
const fnToString = hasOwn.toString;
const getProto = Object.getPrototypeOf;
const ObjectFunctionString = fnToString.call( Object );

const isPlainObject = function( obj ) {
  let proto, Ctor;
  if ( !obj || toString.call( obj ) !== "[object Object]" ) {
    return false;
  }
  proto = getProto( obj );
  if ( !proto ) {
    return true;
  }
  Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
  return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
};

const isFunction = function( obj ) {
  return this.type( obj ) === "function";
};

export function log(...args) {
  console.log(...args);
}

export function fetchHandleErrors(type = 'text') {
  return (response) => {
    if (!response.ok) {
      const { status, statusText, url } = response;
      let error = {message: `${response.status} ${response.statusText}`, status, statusText, url};
      if (IS_DEV) {
        response.text().then(text => {
          console.error({text, response});
        })
      }
      throw error;
    }
    if (response[type]) return response[type]();
    else return response.text();
  }
}

export async function query(url, options = {}) {
  return fetch(`${config.apiUrl}${url}`, {...config.fetchDefaultOptions, ...options})
    .then(fetchHandleErrors('json'))
    .then((data) => {
      return data;
    })
    .catch(error => {
       throw error.status ? error : {message: 'Server is unavailable'};
    });
}

export function stripTags(str) {
  return str.replace(/<\/?[^>]+>/gi, '');
}


export function extend() {
  let options, name, src, copy, copyIsArray, clone,
    target = arguments[ 0 ] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  if ( typeof target === "boolean" ) {
    deep = target;
    target = arguments[ i ] || {};
    i++;
  }
  if ( typeof target !== "object" && !isFunction( target ) ) {
    target = {};
  }
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {

    if ( ( options = arguments[ i ] ) != null ) {

      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        if ( target === copy ) {
          continue;
        }

        if ( deep && copy && ( isPlainObject( copy ) ||
            ( copyIsArray = Array.isArray( copy ) ) ) ) {

          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && Array.isArray( src ) ? src : [];

          } else {
            clone = src && isPlainObject( src ) ? src : {};
          }

          target[ name ] = extend( deep, clone, copy );

        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  return target;
}
