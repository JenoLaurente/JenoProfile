/**
 * CV Service - Handles CV download
 */

export const CVOptions = {
    TECHNICAL: {
        id: 'technical',
        name: 'Technical CV',
        filename: 'Jeno_Aldrei_Laurente_Technical_CV.pdf',
        path: '/Jeno_Aldrei_Laurente_CV.html'
    },
    GENERAL: {
        id: 'general',
        name: 'General CV',
        filename: 'Jeno_Aldrei_Laurente_General_CV.pdf',
        path: '/Jeno_Aldrei_Laurente_General_CV.html'
    }
};

/**
 * Opens CV in a new tab for viewing and printing to PDF
 * Uses the browser's native print-to-PDF functionality
 * @param {string} cvType - Type of CV ('technical' or 'general')
 */
export const openCVInNewTab = (cvType) => {
    const cv = CVOptions[cvType.toUpperCase()];
    if (cv) {
        // Open the CV HTML file in a new tab
        window.open(cv.path, '_blank');
    }
};

/**
 * Get all available CV options
 * @returns {Object[]} Array of CV options with id, name, filename, and path
 */
export const getCVOptions = () => {
    return Object.values(CVOptions).map(cv => ({
        id: cv.id,
        name: cv.name,
        filename: cv.filename
    }));
};
