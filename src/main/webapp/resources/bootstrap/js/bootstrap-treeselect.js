/**
 * bootstrap-treeselect.js
 * wangyq
 */
;(function ($, window, document, undefined) {

	var pluginName = 'TreeSelect';

	var _default = {};

	_default.settings = {
	
	}
	
	var TreeSelect = function(element, options){
		this.options = $.extend(true,{},TreeSelect.DEFAULTS, options);
		this.$element = $(element);
		this.elementId = element.id;
		this.styleId = this.elementId + '-style';
		
		this.init(this.options);
	}
	
	TreeSelect.DEFAULTS = {
        height: "auto",
        data: [],
        method: 'post',
        url: undefined,
        ajax: undefined,
        cache: true,
        contentType: 'application/json',
        dataType: 'json',
        ajaxOptions: {},
        queryParams: function (params) {
            return params;
        },
        search: false,
        searchOnEnterKey: false,
        strictSearch: false,
        clickToSelect: false,
        singleSelect: false,
        searchTimeOut: 500,
        searchText: '',
        iconSize: undefined,
        buttonsClass: 'default',


        onClickNode: function (event, treeId, treeNode) {
        	
        },
        onCheck: function (event, treeId, treeNode) {
        	
        },
        onUncheck: function (event, treeId, treeNode) {
            
        },
        onCheckAll: function (event, treeId, treeNode) {
            
        },
        onUncheckAll: function (event, treeId, treeNode) {
            
        },
        onLoadSuccess: function (event,tree) {
        	
        },
        onLoadError: function (status) {
           
        },
        onSearch: function (text) {
           
        },
        onToggle: function (cardView) {
            
        },
        onExpandNode: function (event, treeId, treeNode) {
            
        },
        onCollapseNode: function (event, treeId, treeNode) {
           
        },
        onRefreshOptions: function (options) {
           
        },
        onRefresh: function (params) {
          
        }
	}
	
	
	TreeSelect.prototype.init = function (options) {
		this.initContainer(options);
		this.initTree(options);
		this.initEvent(options);
	}
	
	TreeSelect.prototype.getOptions = function () {
		return this;
	}
	
	TreeSelect.prototype.getTree = function () {
		return this.$tree;
	}
	
	TreeSelect.prototype.updateTitle = function (title) {
		this.$button_tag.find(".filter-option").html(title);
	}
	
	TreeSelect.prototype.refresh = function (options) {
		this.options = $.extend(true,{},TreeSelect.DEFAULTS, options);
		this.initTree(options);
	}
	
	TreeSelect.prototype.selectNode = function(options){
		if(options && options.name && options.value){
			if(this.$tree){
				var nodes = this.$tree.getNodesByParam(options.name, options.value);
				if(nodes.length>0){
					var node = nodes[0];
					this.$element.val(node.ID);
					this.$tree.selectNode(node);
					this.$button_tag.find(".filter-option").html(node.TITLE);
				}
			}
		}else{
			var val = this.$element.attr("val");
			if(val){
				this.$element.val(val);
			}
			var value = this.$element.val();
			var text = this.$element.find("option:selected").text();
			if(value != null && text != null && text != ''){
				this.$button_tag.find(".filter-option").html(text);
				var nodes = this.$tree.getNodesByParam("ID", value);
				this.$tree.selectNode(nodes[0]);
				if(nodes.length > 0){
					this.options.onClickNode(this.$tree,this.$tree.treeId,nodes[0]);
				}
			}
		}
	}
	
	TreeSelect.prototype.initEvent = function (options) {
		var treeSelect = this;
		
		treeSelect.$search_Text.on("keyup",function(e){
			if(e.keyCode == 13){
				var text = $(this).val();
				if(text != ''){
					treeSelect.$tree.cancelSelectedNode();
					var nodes = treeSelect.$tree.getNodesByParamFuzzy("TITLE", text, null);
					if(nodes.length > 0){
						treeSelect.$tree.expandAll(false);
						for(var i=0;i<nodes.length;i++){
							var parentNode = nodes[i].getParentNode();
							if(parentNode && !parentNode.open){
								if(i == 0){
									treeSelect.$tree.expandNode(parentNode, true, false, false);
								}else{
									treeSelect.$tree.expandNode(parentNode, true, false, false);
								}
							}
							treeSelect.$tree.selectNode(nodes[i], true);
						}
					} else {
						layer.msg("没有搜索结果", {
							icon: 5
						});
					}
				}
			}
			
		});
		
		treeSelect.$button_tag.off("click");
		treeSelect.$button_tag.on("click",function(){
			treeSelect.$dropdown_tag.toggle();
			treeSelect.$treeselect_tag.find("input[type='search']").focus().val("");
		});
		
		
		treeSelect.$element.on("change",function(e,state){
			if(state != false){
				var value = $(this).val();
				var text = $(this).find("option:selected").text();
				if(value != null && text != null && text != ''){
					treeSelect.$button_tag.find(".filter-option").html($(this).find("option:selected").text());
					var nodes = treeSelect.$tree.getNodesByParam("ID", value);
					treeSelect.$tree.selectNode(nodes[0]);
					if(nodes.length > 0){
						treeSelect.options.onClickNode(treeSelect.$tree,treeSelect.$tree.treeId,nodes[0]);
					}
				}
			}
		});
		
		$(document).on("click",function(e){
			if(!(treeSelect.$dropdown_tag[0] == e.target || treeSelect.$button_tag[0] == e.target || treeSelect.$dropdown_tag.find($(e.target)).length > 0 || treeSelect.$button_tag.find($(e.target)).length > 0)){
				treeSelect.$dropdown_tag.hide();
			}
		});
	}
	
	
	TreeSelect.prototype.initContainer = function (options) {
		if(this.$element.parent().is(".bootstrap-treeselect")){
			this.$treeselect_tag = this.$element.parent();
			this.$button_tag = this.$treeselect_tag.find("button");
			this.$button_tag.find(".filter-option").html("--请选择--");
			
			this.$dropdown_tag = this.$treeselect_tag.find(".dropdown-menu");
			this.$search_Text = this.$dropdown_tag.find("input[type='search']");
			this.$tree_tag = this.$dropdown_tag.find(".ztree").empty();
		}else{
			this.$element.css({
				"visibility": "hidden"
			});
			this.$treeselect_tag =  $("<div/>").addClass("btn-group bootstrap-treeselect").css({
				"width": "100%",
				"max-width": "100%"
			});
			this.$button_tag = $("<button type='button' class='btn dropdown-toggle btn-default' title='--请选择--' ><span class='filter-option pull-left'>--请选择--</span><span class='bs-caret'><span class='caret'></span></span></button>").css({
				"max-width": "100%",
				"height": "34px",
				"width": options.height == undefined? "100%" : options.width,
			});
			
			this.$dropdown_tag = $("<div/>").addClass("dropdown-menu").css({
				"width": "100%",
				"height": "auto",
				"overflow": "auto",
				"z-index": 999
			});
			this.$search_Text = $("<input type='search'/>").addClass("form-control");
			this.$tree_tag = $("<div id='tree_"+this.$element.attr("id")+"'/>").addClass("ztree").css({
				"height": options.height == undefined? TreeSelect.DEFAULTS.height : options.height,
				"max-height": "300px",
				"overflow": "auto"
			});
			
			var search_Box = $("<div/>").append(this.$search_Text).css({
				padding: "4px 8px",
				height: "40px"
			});
			   
			var treeselect_box = this.$element.parent();
			
			this.$dropdown_tag.append(search_Box).append(this.$tree_tag);
			
			
			this.$treeselect_tag.append(this.$button_tag).append(this.$dropdown_tag).append(this.$element);
			
			treeselect_box.append(this.$treeselect_tag);
		}
    }
	
	TreeSelect.prototype.initTree = function(options){
		var treeSelect = this;
		var $button_tag = this.$button_tag;
		var $element = this.$element;
		var $dropdown_tag = this.$dropdown_tag;
		var $tree_tag = this.$tree_tag;
		
		var setting = {
			isSimpleData: false, //数据是否采用简单 Array 格式，默认false  
			showLine: true, //是否显示节点间的连线  
			check: {
				enable: false
			},
			view: {
				dblClickExpand: true,
				showLine: true,
				selectedMulti: true
			},
			data: {
				keep: {
					leaf: true,
					parent: true
				},
				key: {
					name: "TITLE",
				},
				simpleData: {
					enable: true,
					idKey: "ID",
					pIdKey: "PID",
				}
			},
			callback: {
				onClick: function(event, treeId, treeNode){
					if(options.onClickNode(event, treeId, treeNode) == false){
						return false;
					}
					$button_tag.find(".filter-option").html(treeNode.TITLE);
					$element.val(treeNode.ID);
					$dropdown_tag.hide();
					$element.trigger("change",false);
				}
			}
		};
		if(options.url != undefined){
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: options.url,
				async: true,
				data: options.data,
				success: function(data) {
					var html = "<option value=''>--请选择--</option>";
					$(data.data).each(function(i, option) {
						html += "<option value='" + option.ID + "'>" + option.TITLE + "</option>";
					});
					treeSelect.$element.html(html);
					treeSelect.$tree = $.fn.zTree.init($tree_tag, setting, data.data);
					var val = $element.attr("val");
					if(val && val != ""){
						treeSelect.$element.val($element.attr("val"));
						treeSelect.$element.trigger("change");
					}
					treeSelect.options.onLoadSuccess(treeSelect,treeSelect.$tree);
				}
			});
		}else{
			treeSelect.$tree = $.fn.zTree.init(this.$tree_tag, setting, options.data);
			this.selectNode();
			//treeSelect.$element.trigger("change");
		}
		var $element_width = $element.width();
		var dropdown_width = treeSelect.$dropdown_tag.width();
		if($element_width > dropdown_width){
			treeSelect.$button_tag.width($element_width);
		}
		
	}

	
	var logError = function (message) {
		if (window.console) {
			window.console.error(message);
		}
	};
	// Prevent against multiple instantiations,
	// handle updates and method calls
	$.fn[pluginName] = function (options, args) {
		var result;
		this.each(function () {
			var _this = $.data(this, pluginName);
			if (typeof options === 'string') {
				if (!_this) {
					if(typeof args === 'function'){
						var data = {};
						data[options] = args;
						$.data(this, pluginName,data);
					}else{
						logError('Not initialized, can not call method : ' + options);
					}
				}
				else if(typeof args === 'function'){
					_this.options[options] = args;
				}
				else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
					logError('No such method : ' + options);
				}
				else {
					if (!(args instanceof Array)) {
						args = [ args ];
					}
					result = _this[options].apply(_this, args);
				}
			}
			else if (typeof options === 'boolean') {
				result = _this;
			}
			else {
				options = $.extend(true, options, $.data(this,pluginName));
				$.data(this, pluginName, new TreeSelect(this, $.extend(true, {}, options)));
			}
		});

		return result || this;
	};
	
})(jQuery, window, document);



