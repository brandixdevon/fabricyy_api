const axios = require('axios')

module.exports = (req, res) => {

    axios.post('https://brandix.centricsoftware.com/csi-requesthandler/api/v2/session', {
        username:'DevonP',
        password:'DP@942470045v'
        })
        .then(response => {
            res.status(200).json({Type: 'SUCCESS', Token : response.data.token})
            return;
        })
        .catch(error => {
            res.status(200).json({Type: 'ERROR', Msg : error})
            return;
        })

};