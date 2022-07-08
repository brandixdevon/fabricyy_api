const axios = require('axios')
const PLMURL = require('../plmurl');

module.exports = async (req, res) => {

    var plmweburl = PLMURL.APIURL;

    var styleseasonid =  req.body.seasonid;
    var usertoken =  req.body.token;

    var bomlist = [];

    var enc_styleseasonid = encodeURIComponent(styleseasonid);

    const resp = await axios.get(`${plmweburl}/csi-requesthandler/api/v2/styles/${enc_styleseasonid}/data_sheets/apparel_boms?skip=0&limit=50`, {
        headers: {
            Cookie:`${usertoken}`
        }
        });

        for (var i = 0; i < resp.data.length; i++)
        {
            let resp2 = await getisApproved(resp.data[i].latest_revision);

            if(resp2.state === "APPROVED")
            {
                bomlist.push({id:resp.data[i].id,latest_revision:resp.data[i].latest_revision,node_name:resp.data[i].node_name});
            }
        }

        res.status(200).json({Type: 'SUCCESS', Dataset : bomlist});
        return;

        async function getisApproved(val_item)
            {

                var letterNumber = encodeURIComponent(val_item);

                    if(letterNumber !== '' && val_item !== "centric%3A")
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


