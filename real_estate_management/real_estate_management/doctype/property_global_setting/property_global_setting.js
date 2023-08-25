// Copyright (c) 2023, arkayapps and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property Global Setting', {
	refresh: function(frm) {
		// Attach event handler for country change
        frm.fields_dict['country'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    // Your filters here...
                }
            };
        };

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
	}
});
