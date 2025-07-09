import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Utility: Detect current theme class on <html>
const isDarkMode = () => document.documentElement.classList.contains('dark');

export const showSuccessAlert = (message) => {
  const dark = isDarkMode();

  MySwal.fire({
    icon: 'success',
    title: 'Success!',
    text: message,
    timer: 2000,
    showConfirmButton: false,
    customClass: {
      popup: `transition-all duration-500 ${
        dark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
      }`,
    },
  });
};

export const showErrorAlert = (message) => {
  const dark = isDarkMode();

  MySwal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    customClass: {
      popup: `transition-all duration-500 ${
        dark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
      }`,
      confirmButton: 'bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded transition-all duration-500',
    },
    buttonsStyling: false,
  });
};

export const showConfirmDialog = async (message = 'Are you sure?') => {
  const dark = isDarkMode();

  const result = await MySwal.fire({
    title: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes!',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: `transition-all duration-500 ${
        dark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
      }`,
      confirmButton: 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-all duration-500',
      cancelButton: 'bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded ml-2 transition-all duration-500',
    },
    buttonsStyling: false,
  });

  return result.isConfirmed;
};
