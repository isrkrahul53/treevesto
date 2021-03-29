const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
        env:{
            apiUrl:"https://api.treevesto.com:4000/"
        }
    }
  }

  return {
    /* config options for all phases except development here */
  }
}