// Copyright (c) 2023, arkayapps and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property', {
    refresh: function(frm) {

        // frm.fields_dict['property_type'].get_query = function(doc, cdt, cdn) {
        //     return {
        //         filters: {
        //             // Your filters here...
        //         }
        //     };
        // };

		frm.fields_dict['property_category'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    'property_type_name': doc.property_type
                }
            };
        };

        // Attach event handler for country change
        // frm.fields_dict['country'].get_query = function(doc, cdt, cdn) {
        //     return {
        //         filters: {
        //             // Your filters here...
        //         }
        //     };
        // };

        // Attach event handler for state change
        frm.fields_dict['state'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    'country_name': doc.country
                }
            };
        };

        // Attach event handler for city change
        frm.fields_dict['city'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    'state_name': doc.state
                }
            };
        };

        // Attach event handler for area change
        frm.fields_dict['area'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    'city_name': doc.city
                }
            };
        };
    },

    onload: function(frm) {
        if (frm.doc.__islocal) {
            frappe.after_ajax(function() {
                // Fetch values from Property Global Setting and set them in the form.
                frappe.call({
                    method: 'frappe.client.get',
                    args: {
                        doctype: 'Property Global Setting',
                        name: 'Property Global Setting'
                    },
                    callback: function(response) {
                        var globalSettings = response.message;

                        // Set values in the property form.
                        frm.doc.country = globalSettings.country;
                        frm.doc.state = globalSettings.state;
                        frm.doc.city = globalSettings.city;

                        // Refresh the form fields.
                        frm.refresh_fields();
                    }
                });
            });
        }
    },

    property_category: function(frm) {
        if (frm.doc.property_category) {
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Property Category Field',
                    filters: { 'category_name': frm.doc.property_category },
                    fields: ['field_name']
                },
                callback: function(response){
                    if (response.message) {
                        frm.doc.property_informations = [];
                        response.message.forEach(function(field) {
                            const field_name = field.field_name;
                            console.log(field_name)
                            frappe.call({
                                method: 'frappe.client.get_value',
                                args: {
                                    doctype: 'Property Field',
                                    filters: { 'name': field_name },
                                    fieldname: ['property_field_name']
                                },
                                callback: function(fieldResponse){
                                    if (fieldResponse.message) {
                                        const property_field_name = fieldResponse.message.property_field_name;
                                        frm.add_child('property_informations', {
                                            detail: property_field_name,
                                            value: '',
                                        });
                                        frm.refresh_field('property_informations');
                                    }
                                }
                            });
                        });
                    }
                }
            });
        }
    }
});
