const axios = require('axios')

module.exports = async (req, res) => {

    var styleid =  req.body.styleid;
    var usertoken =  req.body.token;

    var seasonlist = [];

    const resp = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/styles?node_name=${styleid}&active=true&bx_style_status=Confirmed`, {
        headers: {
            Cookie:`${usertoken}`
        }
        });
 
            Promise.all(resp.data.map(async (x) => {
            
            let resp2 = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/seasons/${x.parent_season}`, {
            headers: {
                Cookie:`${usertoken}`
            }
            });
                
            seasonlist.push({idstyle:x.id,idseason:resp2.data.id,fs:resp2.data.node_name});

            })).then(function()
            {
                res.status(200).json({Type: 'SUCCESS', Dataset : seasonlist})
                return;
            })
        

};


