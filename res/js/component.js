sap.ui.commons.ComboBox.extend("com.leandro.gp.combobox.ComboBox", {
	// SAP UI5 Metadata convenience at work - Setter and getter
	// are created
	// behind the scenes, including data binding and type
	// validation
	metadata : { // Not to be confused with the Data Source
		// metadata property
		properties : {
			"name" : "string",
			"items" : null,
			"selectedValue" : null,
			"selectedKey" : null
		// "buttonClicked" : {defaultValue : -1, type : "int" },
		// "buttonClickedTitle" : {defaultValue : "Nothing
		// Clicked YET", type :
		// "string" }
		}
	},
	setItems : function(value) {
		this.items = value;
		if(!value)
			return;
		
		var uniqueId = this.getId();
		var dados = value.split(";");
		
		var selectValor = this.getSelectedValue();

		this.setEditable(true);
		this.destroyItems();
		var firstItem = "";
		for ( var i = 0; i < dados.length; i++) {
			var item = dados[i].split(",");
			var chave = item[0];
			var texto = item[1];
			if(i == 0)
				firstItem = texto;
			var oItem = new sap.ui.core.ListItem(uniqueId + chave);
			oItem.setText(texto);
			this.addItem(oItem);
			
			
		}
		if (!selectValor)
			this.setValue(firstItem);
		else
			this.setValue(selectValor);
		
		

	},
	getDataSet : function() {
		return this.dataSet;
	},
	setSelectedValue : function(value) {
		this.selectedValue = value;
	},
	getSelectedValue : function() {
		return this.selectedValue;
	},
	setSelectedKey : function(value) {
		this.selectedKey = value;
	},
	getSelectedKey : function() {
		return this.selectedKey;
	},
	// SAPUI5 Renderer, we can leave it aloneS
	renderer : {

	// render : function(rm, oControl) {
	// }
	},
	// Called by sap.designstudio.sdkui5.Handler
	// (sdkui5_handler.js)
	initDesignStudio : function() {
		try {
			var that = this;
			this.attachChange(function() {
				that.setSelectedKey(that.getSelectedItemId().replace(this.getId(),""));
				that.setSelectedValue(that.getValue());
				that.fireDesignStudioPropertiesChanged( [ "selectedValue",
						"selectedKey" ]);
				that.fireDesignStudioEvent("onchange");
			});
		} catch (e) {
			alert(e); // Aw snap
		}

	}

});