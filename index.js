/**
 * Try fn(), or return defaultValue when failed.
 * @module tryordefault
 */
module.exports = {

    /**
     * Try to execute fn(), return defaultValue if failed
     * @param {Function} fn function to be run.
     * @param {*} defaultValue default value to be returned if fail.
     * @return {*} result of fn() when success, or defaultValue when fail 
     */
    tryOrDefault: (fn, defaultValue) => {
        try {
            return fn();
        } catch (e) {
            return defaultValue;
        }
    },

    /**
     * Try to execute async fn(), return defaultValue if failed
     * @param {Function} fn async function to be run.
     * @param {*} defaultValue default value to be returned if fail.
     * @return {*} result of fn() when success, or defaultValue when fail 
     */
    tryOrDefaultAsync: async (fn, defaultValue) => {
        try {
            return await fn();
        } catch (e) {
            return defaultValue;
        }
    }

};