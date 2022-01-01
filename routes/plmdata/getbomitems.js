const axios = require('axios')

module.exports = async (req, res) => {

    var itemlistids =  req.body.itemlistids;
    var usertoken =  req.body.token;

    var items_fabric = [];
    var items_fabric_name = [];

  
            let proall = await Promise.all( 
                
                itemlistids.map(async (y) => {

                    var letterNumber = /^[0-9a-zA-Z]+$/;

                    if(y.match(letterNumber))
                    {
                        let resp = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/part_materials/${y}`, {
                        headers: {
                            Cookie:`${usertoken}`
                        }
                        });

                        

                        if(resp.status === 200){
                            
                            var nameofitem = await getitemname(resp.data.actual);
                            var nameofsupplier = await getsuppliername(resp.data.bom_line_quote);
                            var nameofmattype = await getmaterialtype(nameofitem.product_type);
                            
                            if(nameofmattype.node_name === "Fabric")
                            {
                                items_fabric.push({id:y,
                                    actual:resp.data.actual,
                                    placement:resp.data.node_name,
                                    color_way_type:resp.data.bx_colorway_type,
                                    color_way_colors:resp.data.colorways_color,
                                    garment_way:resp.data.bx_garment_way,
                                    cuttable_width:0,
                                    item_name:nameofitem.node_name,
                                    description:nameofitem.description,
                                    supplier:nameofsupplier.node_name,
                                    material_type:nameofmattype.node_name,
                                });
                            }
                        }
                    }

                    

                })

            
            ).then(function()
            {
                res.status(200).json({Type: 'SUCCESS', Dataset : items_fabric})
                return;

            })

            async function getitemname(val_item)
            {

                var letterNumber = /^[0-9a-zA-Z]+$/;

                    if(val_item.match(letterNumber))
                    {
                        let resp_1 = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/materials/${val_item}`, {
                            headers: {
                                Cookie:`${usertoken}`
                            }
                            });

                            if(resp_1.status === 200)
                            {
                                return ({node_name: resp_1.data.node_name, description : resp_1.data.description, product_type:resp_1.data.product_type});
                            }
                            else
                            {
                                return ({node_name: '', description : '', product_type:''});
                            } 
                    }
                    else
                    {
                        return ({node_name: '', description : '', product_type:''});
                    }
                
            }

            async function getsuppliername(val_supplier)
            {
                var letterNumber = /^[0-9a-zA-Z]+$/;

                    if(val_supplier.match(letterNumber))
                    {
                        let resp_2 = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/supplier_items/${val_supplier}`, {
                            headers: {
                                Cookie:`${usertoken}`
                            }
                            });
                            
                            if(resp_2.status === 200)
                            {
                                return ({node_name: resp_2.data.node_name});
                            }
                            else
                            {
                                return ({node_name: ''});
                            }
                    }
                    else
                    {
                        return ({node_name: ''});
                    }
                

            }

            async function getmaterialtype(val_materialtype)
            {
                var letterNumber = /^[0-9a-zA-Z]+$/;

                    if(val_materialtype.match(letterNumber))
                    {
                        let resp_3 = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/material_types/${val_materialtype}`, {
                            headers: {
                                Cookie:`${usertoken}`
                            }
                            });
                            
                            if(resp_3.status === 200)
                            {
                                return ({node_name: resp_3.data.node_name});
                            }
                            else
                            {
                                return ({node_name: ''});
                            }
                    }
                    else
                    {
                        return ({node_name: ''});
                    }
                

            }

};


