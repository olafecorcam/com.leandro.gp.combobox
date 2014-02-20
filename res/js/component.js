sap.ui.commons.ComboBox.extend("com.leandro.gp.combobox.ComboBox", {
	// SAP UI5 Metadata convenience at work - Setter and getter are created
	// behind the scenes, including data binding and type validation
	metadata : { // Not to be confused with the Data Source metadata property
		properties : {
			"name" : "string",
			"itemToShow" : null,
			"textExtra" : null,
			"selectedValue" : null,
			"dataSet" : null
		// "buttonClicked" : {defaultValue : -1, type : "int" },
		// "buttonClickedTitle" : {defaultValue : "Nothing Clicked YET", type :
		// "string" }
		}
	},
	setDataSet : function(value) {
		this.dataSet = value;

		var dados = this.dataSet.dimensions;
		var itemToShow = this.getItemToShow();
		var selectValor = this.getSelectedValue();
		var textExtras  = this.getTextExtra();

		this.setEditable(true);
		this.destroyItems();
		if(textExtras){
			var oItem = new sap.ui.core.ListItem("ID_"+textExtras);
			oItem.setText(textExtras);
			this.addItem(oItem);
			if(!selectValor)
				this.setValue(textExtras);
			else
				this.setValue(selectValor);
		}
		
		
		if (dados && dados[itemToShow]) {
			var items = dados[itemToShow].members;
			for ( var i = 0; i < items.length; i++) {
				if (items[i].type == "RESULT")
					continue;
				//here i have to cancat an string, since id cant start with number
				var oItem = new sap.ui.core.ListItem("ID_"+items[i].key);
				oItem.setText(items[i].text);
				
				//if(!selectValor && !itemToShow)
				
				this.addItem(oItem);
			}
		} else {
			alert("Select a valid Item to show!");
		}
		// this.setTooltip("Country");

		},
		getDataSet : function() {
			return this.dataSet;
		},
		setItemToShow : function(value) {
			this.setProperty("itemToShow", value);
		},
		setSelectedValue : function(value) {
			this.selectedValue = value.replace("ID_","");
		},
		getSelectedValue : function (){
			return this.selectedValue;
		},
		// SAPUI5 Renderer, we can leave it alone
			renderer : {
		
			// render : function(rm, oControl) {
			// }
			},
		// Called by sap.designstudio.sdkui5.Handler (sdkui5_handler.js)
		initDesignStudio : function() {
				try {
					var that = this;
					this.attachChange(function() {
						alert(that.getValue());
						that.setProperty("selectedValue",that.getValue());
						that.fireDesignStudioPropertiesChanged(["selectedValue"]);	
						that.fireDesignStudioEvent("onchange");
					});
		} catch (e) {
			alert(e); // Aw snap
		}
		}

});