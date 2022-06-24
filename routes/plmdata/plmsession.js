const axios = require('axios')
const PLMURL = require('../plmurl')

module.exports = (req, res) => {
 
    var plmweburl = PLMURL.APIURL;

    axios.post(`${plmweburl}/csi-requesthandler/api/v2/session`, {
        username:'AthulaV',
        password:'aspirine@12345678'
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