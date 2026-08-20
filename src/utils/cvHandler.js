/**
 * Utility helper for Nirmali L.P.R.N. Ranawaka Google Drive CV viewing and direct PDF download handling
 */

export const GOOGLE_DRIVE_CV_FOLDER = 'https://drive.google.com/drive/folders/10aWgT0OdnYPaWhuIWI_uBY5SFr0ttCqp?usp=sharing';
export const LOCAL_CV_PDF_PATH = '/assets/Nirmali_LPRN_Ranawaka_CV.pdf';

/**
 * Opens public view of the Google Drive folder containing Nirmali's CV in a new browser tab
 */
export function handleViewCV() {
  window.open(GOOGLE_DRIVE_CV_FOLDER, '_blank', 'noopener,noreferrer');
}

/**
 * Initiates an immediate direct download of Nirmali L.P.R.N. Ranawaka's PDF CV document
 */
export function handleDownloadCV() {
  const link = document.createElement('a');
  link.href = LOCAL_CV_PDF_PATH;
  link.setAttribute('download', 'Nirmali_LPRN_Ranawaka_CV.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
