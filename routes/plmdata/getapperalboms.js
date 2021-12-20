const axios = require('axios')

module.exports = async (req, res) => {

    var styleseasonid =  req.body.seasonid;
    var usertoken =  req.body.token;

    axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/styles/${styleseasonid}/data_sheets/apparel_boms`, {
        headers: {
            Cookie:`${usertoken}`
        }
        })
        .then(response => {
            res.status(200).json({Type: 'SUCCESS', Dataset : response.data})
            return;
        })
        .catch(error => {
            res.status(200).json({Type: 'ERROR', Msg : error})
            return;
        })

};


