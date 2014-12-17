
CKEDITOR.dialog.add('drawingBoardDialog', function(editor) {
	return {
		title:		'Drawing Board',
		resizable:	CKEDITOR.DIALOG_RESIZE_BOTH,
		minWidth:	500,
		minHeight:	400,
		contents:	[
			{
				id: 		'drawingBoardStage',
				label:		'Drawing Board',
				title:		'Drawing Board',
				elements:	[
					{
						type: 	'html',
						html:	'<p>test</p>'
					}			
				]
			}
		],
		onLoad:		function(e) {
		},
		onShow:		function(e) {
		}
	}
})

