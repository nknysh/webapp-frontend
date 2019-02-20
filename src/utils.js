// Libraries
import moment from 'moment';

// eslint-disable-next-line
const displayDateRange = (startDate, endDate) => {
  // each case allows us to display the same format, even with trips that
  // extend to different months and years
  // e.g. Aug 8 - Aug 9 > Aug 8 - 9
  // e.g. Dec 9 - Mar 10 > Dec 9 2017 - Mar 10 2018
  let formattedDate = '';
  const firstDateYear = moment(startDate).format('YYYY');
  const secondDateYear = moment(endDate).format('YYYY');
  const firstDateMonth = moment(startDate).format('MMM');
  const secondDateMonth = moment(endDate).format('MMM');
  const differentMonth = moment(startDate).format('MMM D')
    .concat(' - ', moment(endDate).format('MMM D[,] YYYY'));
  const sameMonth = moment(startDate).format('MMM D')
    .concat(' - ', moment(endDate).format('D[,] YYYY'));
  const differentYear = moment(startDate).format('MMM D YYYY')
    .concat(' - ', moment(endDate).format('MMM D[,] YYYY'));

  if (firstDateMonth !== secondDateMonth) {
    formattedDate = differentMonth;
  } else if (firstDateYear !== secondDateYear) {
    formattedDate = differentYear;
  } else {
    formattedDate = sameMonth;
  }

  return formattedDate;
};

const downloadPdf = (pdf) => {
  if (typeof window.chrome !== 'undefined') {
    // Chrome version
    const link = document.createElement('a');
    const blob = new Blob([base64ToArrayBuffer(pdf)], { type: 'application/pdf' });
    link.href = window.URL.createObjectURL(blob);
    link.download = "proposal.pdf";
    document.body.appendChild(link);
    link.click();
  } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE version
      const blob = new Blob([pdf], { type: 'application/pdf' });
      window.navigator.msSaveBlob(blob, "proposal.pdf");
  } else {
      // Firefox version
      const file = new File([pdf], "proposal.pdf", { type: 'application/force-download' });
      window.open(URL.createObjectURL(file));
  }
};

const base64ToArrayBuffer = (base64) => {
  const bString = window.atob(base64);
  const len = bString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = bString.charCodeAt(i);
  }
  return bytes.buffer;
};

export {
  base64ToArrayBuffer,
  displayDateRange,
  downloadPdf
};
