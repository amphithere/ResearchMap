function convertUTCDateToLocalDate(e){var t=new Date(e.getTime()+60*e.getTimezoneOffset()*1e3),i=e.getTimezoneOffset()/60,n=e.getHours();return t.setHours(n-i),t}