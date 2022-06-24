const axios = require('axios')
const PLMURL = require('../plmurl')

module.exports = async (req, res) => {

    var plmweburl = PLMURL.APIURL;

    var styleseasonid =  req.body.seasonid;
    var usertoken =  req.body.token;

    var bomlist = [];

    var enc_styleseasonid = encodeURIComponent(styleseasonid);

    const resp = await axios.get(`${plmweburl}/csi-requesthandler/api/v2/styles/${enc_styleseasonid}/data_sheets/apparel_boms`, {
        headers: {
            Cookie:`${usertoken}`
        }
        });

        Promise.all(resp.data.map(async (x) => {

            let resp2 = await getisApproved(x.latest_revision);

            if(resp2.state === "APPROVED")
            {
                bomlist.push({id:x.id,latest_revision:x.latest_revision,node_name:x.node_name});
            }

        })).then(function(){

            res.status(200).json({Type: 'SUCCESS', Dataset : bomlist});
            return;
        })

        async function getisApproved(val_item)
            {

                var letterNumber = encodeURIComponent(val_item);

                    if(letterNumber !== '')
                    {
                        let resp_1 = await axios.get(`${plmweburl}/csi-requesthandler/api/v2/apparel_bom_revisions/${letterNumber}`, {
                            headers: {
                                Cookie:`${usertoken}`
                            }
                            });

                            if(resp_1.status === 200)
                            {
                                return ({state: resp_1.data.state});
                            }
                            else
                            {
                                return ({state: ''});
                            } 
                    }
                    else
                    {
                        return ({state: ''});
                    }
                
            }

};


