const axios = require('axios')

module.exports = (req, res) => {

    axios.post('https://brandix.centricsoftware.com/csi-requesthandler/api/v2/session', {
        username:'DevonP',
        password:'Dare2EnterIn@8'
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