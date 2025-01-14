import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        loading: 'Loading...',
        select: 'Select',
        selected: 'Selected',
        profile: 'Profile',
        logout: 'Logout',
        cancel: 'Cancel',
        save: 'Save Changes',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        import: 'Import',
        importing: 'Importing...',
        done: 'Done',
        back: 'Back',
        status: {
          active: 'Active',
          completed: 'Completed',
          cancelled: 'Cancelled',
          pending: 'Pending'
        }
      },
      login: {
        title: 'Summer Trip Manager',
        subtitle: 'Employee Login Portal',
        employeeId: 'Employee ID',
        submit: 'Sign In',
        invalidId: 'Invalid Employee ID. Please try again.',
        success: 'Successfully signed in!'
      },
      destinations: {
        title: 'Summer Trip Selection',
        subtitle: 'Select Your Vacation Preferences',
        instructions: 'Choose one destination and select three weeks for your summer vacation',
        selectDestination: 'Select Your Destination',
        selectDates: 'Select Your Travel Weeks',
        weeksSelected: 'weeks selected',
        maxWeeksSelected: 'You have selected the maximum number of weeks. Remove a selection to choose a different week.',
        selectAccommodation: 'Choose Your Accommodation',
        weekStarts: 'Week starts on Friday',
        confirmSelection: 'Confirm Your Selection',
        selectionsSaved: 'Your selections have been saved successfully!',
        capacity: '{{count}} guests',
        selectWeeks: 'Select three weeks for your vacation',
        noAccommodations: 'No accommodations available for your grade level',
        selectionComplete: 'Selection Complete',
        reviewSelection: 'Review your selection before confirming',
        progress: '{{current}}/{{total}} weeks selected'
      },
      profile: {
        title: 'My Profile',
        subtitle: 'View and manage your trip selections',
        currentPreferences: 'Current Trip Selection',
        travelHistory: 'Travel History',
        noPreferences: 'No trip selections made yet',
        noHistory: 'No previous travel history',
        selectedWeeks: 'Selected Travel Weeks',
        weekNumber: 'Week {{number}}',
        won: 'Selected',
        notWon: 'Not Selected'
      },
      admin: {
        title: 'Admin Dashboard',
        subtitle: 'Manage summer trip program',
        tabs: {
          draw: 'Draw Management',
          selections: 'Trip Selections',
          employees: 'Employees',
          accommodations: 'Accommodations'
        },
        sections: {
          draw: {
            title: 'Draw Management',
            subtitle: 'Manage and perform the selection draw'
          },
          selections: {
            title: 'Trip Selections',
            subtitle: 'View and manage employee selections'
          },
          employees: {
            title: 'Employee Management',
            subtitle: 'Manage employee accounts and data'
          },
          accommodations: {
            title: 'Accommodation Management',
            subtitle: 'Manage available accommodations'
          }
        }
      }
    }
  },
  ar: {
    translation: {
      // Arabic translations (mirror of English structure)
      // Add all Arabic translations here
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;