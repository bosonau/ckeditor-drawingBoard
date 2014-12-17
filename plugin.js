CKEDITOR.plugins.add( 'drawingboard', {
    icons: 'drawingboard',
    init: function( editor ) {
		editor.addCommand( 'drawingboardDialog', new CKEDITOR.dialogCommand( 'drawingboardDialog' ) );
		editor.ui.addButton( 'DrawingBoard', {
			label:	'Drawing Board',
			command: 'drawingboardDialog',
			toolbar: 'insert',
			icon:	'drawingboard'
		});
		CKEDITOR.dialog.add('drawingboardDialog', function(editor) {
			 var urlA = window.location.href.split('/');
			 var coid = null;
			 var pattern = /(coid|courseofferingID)/i;
			 var dbURL = '/core/views/common/javascripts/drawingBoard/canvas.html';
			 for(var i=0;i<urlA.length;i++) {
			 	if(urlA[i].search(pattern) > -1 && i < (urlA.length-1) ) {
					coid = urlA[i+1]	
				}	
			 }
			 if(coid) {
			 	dbURL = dbURL+'?coid='+coid;
			 }
			 var dialogDefinition = {
                title: 'Drawing Board',
				width: 500,
				height: 300,
                contents: [
                    {
                        id: 'drawingBoardStage',
                        label: 'Label',
                        title: 'Title',
                        expand: true,
                        padding: 0,
                        elements: [
                            {	
                                type: 'iframe',
								id:'drawingBoard',
								style:'height:290px;width:500px;',
                                src: dbURL
                            }
                        ]
                    }
                ],
                buttons: [ 
                		{
                		id: 		'dbOKButton',
                		label: 		'Ok',
                		title:		'Ok',
                		disabled:	false,
                		type:		'button',
                		disabledText:	'Saving...',
                		
                		onClick:	function(e) {
                						var domEle = this.getElement();
                						var dialog = CKEDITOR.dialog.getCurrent();
                						var stageObj = dialog.getContentElement('drawingBoardStage','drawingBoard');
										try {
											var stageWin = document.getElementById(stageObj.domId).contentWindow;
											this.disableMe();
											stageWin.saveImage();
										} catch(e) {
											
										}
										return false;
                					},
                		disableMe:	function() {
                			this.disabled = true;
                			var innerSpan = this.getElement().getFirst();
                			innerSpan.setText(this.disabledText);
                		},
                		enableMe:	function() {
                			this.disabled = false;
                			var innerSpan = this.getElement().getFirst();
                			innerSpan.setText(this.label);
                		}
                	
                	}, 
                	//CKEDITOR.dialog.okButton, 
                	CKEDITOR.dialog.cancelButton,
                	
                ],
                onCancel: function() {
                	var okBtn = this.getButton('dbOKButton');
                	if(okBtn.disabled == true) {
                		okBtn.enableMe();
                	}
                }
            };
            return dialogDefinition;
		});
		
		/*
		CKEDITOR.dialog.addIframe ('drawingboardDialog', 
			'Drawing Board',
			'/core/views/common/javascripts/drawingBoard/canvas.html',
			500,
			400,
			function() {
				//dynamically get rid of hte padding and margins
				var contentsA = document.getElementsByClassName('cke_dialog_ui_vbox_child');
				for(var i=0; i<contentsA.length;i++) {
					contentsA[i].style.padding=0;
					contentsA[i].style.margin=0;
				}
			},
			{
				onOk:	function(e) {
					console.log(window.frames['iframe']);
					
					var ok = confirm('save?');
					return ok;	
				}
			}
		);*/
		
		
		
    }
});
