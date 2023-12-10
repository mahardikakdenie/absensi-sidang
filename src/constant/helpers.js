import { useToast } from 'vue-toastification';
import client from '@/helpers/http-client.js'

/**
 * Display a toast message.
 *
 * @param {string} type - The type of the toast (success, error, info, warning).
 * @param {Number} duration - The duration of the toast message in milliseconds.
 * @param { String } message - Message of the the toast
 */
export const generateNotification = (type, duration, message) => {
    const toastInstance = useToast();

    // Ensure the provided type is one of the supported types
    const supportedTypes = ['success', 'error', 'info', 'warning'];
    const isValidType = supportedTypes.includes(type);

    if (!isValidType) {
        console.error('Invalid toast type. Supported types: success, error, info, warning');
        return;
    }

    /**
     * Options for the toast message.
     *
     * @type {object}
     * @property {number} timeout - The duration of the toast message.
     */
    const toastOptions = {
        timeout: duration || 2000,
    };

    // Use dynamic property to select the appropriate toast method based on the provided type
    toastInstance[type](message, toastOptions);
};

export const axiosHit = (endpoint, params, type, callback, errCallback) => {
    const param = type === 'get' ? { params } : params;
    client[type](endpoint, param)
        .then(res => {
            if (callback) callback(res);
        }).catch(e => {
            if (errCallback) errCallback(e);
        })
};
