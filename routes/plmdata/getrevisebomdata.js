const axios = require('axios')

module.exports = async (req, res) => {

    var revbomid =  req.body.revbomid;
    var usertoken =  req.body.token;

    var colorways = [];

    const resp = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/apparel_bom_revisions/${revbomid}`, {
        headers: {
            Cookie:`${usertoken}`
        }
        });
        
            Promise.all( 
                
                await resp.data.bom_product_colors.map(async (x) => {
            
                    let resp2 = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/colorways/${x}`, {
                    headers: {
                        Cookie:`${usertoken}`
                    }
                    });
                    colorways.push({id:x,name:resp2.data.node_name,desc:resp2.data.description,garmentway:resp2.data.bx_garment_way,colorway:resp2.data.bx_colorway_name});

                }),
            
            ).then(function()
            {
                res.status(200).json({Type: 'SUCCESS', Dataset : resp.data , colorways : colorways})
                return;
            })

};


