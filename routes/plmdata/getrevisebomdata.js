const axios = require('axios')
const PLMURL = require('../plmurl')

module.exports = async (req, res) => {

    var revbomid =  req.body.revbomid;
    var usertoken =  req.body.token;

    var colorways = [];

    var enc_revbomid = encodeURIComponent(revbomid);
    var plmweburl = PLMURL.APIURL;

    const resp = await axios.get(`${plmweburl}/csi-requesthandler/api/v2/apparel_bom_revisions/${enc_revbomid}`, {
        headers: {
            Cookie:`${usertoken}`
        }
        });
            Promise.all( 

                resp.data.bom_product_colors.map(async (x, index) => {
                    
                    var val_seq= index + 1;
                    let resp2 = await getColor(x);
                    
                    if(resp2.node_name !== '')
                    {

                    colorways.push({id:x,name:resp2.node_name,desc:resp2.description,garmentway:resp2.bx_garment_way,colorway:resp2.bx_colorway_name,seq:val_seq});
                    
                    }
                })
            
            ).then(function()
            {
                res.status(200).json({Type: 'SUCCESS', Dataset : resp.data , colorways : colorways})
                return;
            })


            async function getColor(val_item)
            {

                var letterNumber = encodeURIComponent(val_item);

                    if(letterNumber !== "")
                    {
                        let resp_color = await axios.get(`${plmweburl}/csi-requesthandler/api/v2/colorways/${letterNumber}`, {
                            headers: {
                                Cookie:`${usertoken}`
                            }
                            });

                            if(resp_color.status === 200)
                            {
                                return ({node_name: resp_color.data.node_name,description:resp_color.data.description,bx_garment_way:resp_color.data.bx_garment_way,bx_colorway_name:resp_color.data.bx_colorway_name});
                            }
                            else
                            {
                                return ({node_name:'',description:'',bx_garment_way:'',bx_colorway_name:''});
                            } 
                    }
                    else
                    {
                        return ({node_name:'',description:'',bx_garment_way:'',bx_colorway_name:''});
                    }
                
            }

};


