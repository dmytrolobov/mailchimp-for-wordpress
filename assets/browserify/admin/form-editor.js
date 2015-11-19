/* Editor */
var FormEditor = function(element) {

	// require CodeMirror & plugins
	var CodeMirror = require('codemirror');
	require('codemirror/mode/xml/xml');
	require('codemirror/mode/javascript/javascript');
	require('codemirror/mode/css/css');
	require('codemirror/mode/htmlmixed/htmlmixed');
	require('codemirror/addon/fold/xml-fold');
	require('codemirror/addon/edit/matchtags');
	require('codemirror/addon/edit/closetag.js');

	var r = {};
	var editor;

	if( CodeMirror ) {
		editor = CodeMirror.fromTextArea(element, {
			selectionPointer: true,
			matchTags: { bothTags: true },
			mode: "htmlmixed",
			htmlMode: true,
			autoCloseTags: true,
			autoRefresh: true
		});

		// dispatch regular "change" on element event every time editor changes
		editor.on('change',function() {
			if(typeof(Event) === "function") {
				// Create a new 'change' event
				var event = new Event('change', { bubbles: true });
				element.dispatchEvent(event);
			}
		});
	}

	r.getValue = function() {
		if( editor ) {
			return editor.getValue();
		}

		return element.value;
	};

	r.insert = function( html ) {
		if( editor ) {
			editor.replaceSelection( html );
			editor.focus();
		}

		element.value += html;
	};

	r.on = function(event,callback) {

		if( editor ) {

			// translate "input" event for CodeMirror
			if( event === 'input' ) {
				event = 'changes';
			}

			return editor.on(event,callback);
		}

		return element.addEventListener(event,callback);
	};

	r.refresh = function() {
		if( editor ) {
			editor.refresh();
		}
	};

	return r;
};

module.exports = FormEditor;